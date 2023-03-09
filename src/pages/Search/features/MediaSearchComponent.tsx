import { Button } from "@material-tailwind/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import VerticalCardLoader from "../../../components/Card/MediaCard/VerticalCard.loader";
import { MediaType } from "../../../gql/graphql";
import { getSearchMedia } from "../../../queries/getSearchMedia";
import { anilistClient } from "../../../queries/graphqlClient";
import DefaultMediaSearch from "./DefaultMediaSearch.component";
import { v4 as uuidv4 } from "uuid";
import MediaCard from "../../../components/Card/MediaCard/MediaCard.component";
import { useAppSelector } from "../../../hooks/customRedux";
import useCheckFilters from "../../../hooks/useCheckFilters";
import SearchFilterChips from "./SearchFilterChips";

type MediaSearchComponentProps = {
  searchParams: string;
  type: MediaType;
  resetInput: () => void;
};

const MediaSearchComponent = ({ searchParams, type, resetInput }: MediaSearchComponentProps) => {
  const {
    advancedSearch,
    advancedSearch: { genres, tags, year },
  } = useAppSelector((state) => state);

  const { checkIfFiltersAreActive } = useCheckFilters(searchParams);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["search", searchParams, type, searchParams === "", advancedSearch],
    queryFn: async ({ pageParam = 1 }) => {
      return anilistClient.request(getSearchMedia, {
        type: type,
        perPage: 25,
        page: pageParam,
        ...(searchParams && { search: searchParams }),
        ...(genres.length > 0 && { genres: genres }),
        ...(tags.length > 0 && { tags: tags }),
        ...(year[0] !== "" && { year: year[0] + "%" }),
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.Page?.pageInfo?.hasNextPage) {
        return lastPage?.Page?.pageInfo?.currentPage && lastPage.Page.pageInfo.currentPage + 1;
      }
      return false;
    },
  });

  if (searchParams && status === "success" && data?.pages[0]?.Page?.pageInfo?.total === 0) {
    return (
      <div className="my-32 text-center text-xl font-bold tracking-wider text-gray-300">
        No Results
      </div>
    );
  }

  return (
    <div className="my-4">
      {!checkIfFiltersAreActive() && <DefaultMediaSearch type={type} />}

      {/* Search Results */}
      <SearchFilterChips searchParams={searchParams} resetInput={resetInput} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {/* Loader */}
        {status === "loading" && [...Array(25)].map(() => <VerticalCardLoader key={uuidv4()} />)}

        {/* Search results  */}
        {checkIfFiltersAreActive() &&
          data?.pages.map((page) => {
            return page?.Page?.media?.map((media, i) => {
              return media && <MediaCard media={media} key={`${media.__typename}-${i}`} />;
            });
          })}

        {/* Infinite Query Loader */}
        {isFetchingNextPage && [...Array(9)].map(() => <VerticalCardLoader key={uuidv4()} />)}
      </div>

      {checkIfFiltersAreActive() && hasNextPage && (
        <Button
          size="sm"
          color="gray"
          className="my-4 bg-accent-gray-darkest"
          fullWidth
          onClick={() => {
            fetchNextPage();
          }}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default MediaSearchComponent;

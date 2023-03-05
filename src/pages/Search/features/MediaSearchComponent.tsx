import { useInfiniteQuery } from "@tanstack/react-query";
import SearchResults from "../../../components/SearchResults/SearchResults.component";
import { MediaType } from "../../../gql/graphql";
import { getSearchMedia } from "../../../queries/getSearchMedia";
import { anilistClient } from "../../../queries/graphqlClient";
import DefaultMediaSearch from "./DefaultMediaSearch.component";

type MediaSearchComponentProps = {
  searchParams: string;
  type: MediaType;
  resetInput: () => void;
};

const MediaSearchComponent = ({ searchParams, type, resetInput }: MediaSearchComponentProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["search", searchParams, type],
    queryFn: async ({ pageParam = 1 }) => {
      return anilistClient.request(getSearchMedia, {
        type: type,
        search: searchParams,
        perPage: 9,
        page: pageParam,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.Page?.pageInfo?.hasNextPage) {
        return lastPage?.Page?.pageInfo?.currentPage && lastPage.Page.pageInfo.currentPage + 1;
      }
      return false;
    },
  });

  return (
    <div>
      {!searchParams && <DefaultMediaSearch type={type} />}

      {/* Search Results */}

      <SearchResults
        trendingAnime={data}
        isLoading={status === "loading"}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        searchParams={searchParams}
        resetInput={resetInput}
      />
    </div>
  );
};

export default MediaSearchComponent;

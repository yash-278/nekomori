import { useInfiniteQuery } from "@tanstack/react-query";
import VerticalCardLoader from "../../../components/Card/MediaCard/VerticalCard.loader";
import { getSearchStaff } from "../../../queries/getSearchMedia";
import { anilistClient } from "../../../queries/graphqlClient";
import { v4 as uuidv4 } from "uuid";
import { Button, Chip } from "@material-tailwind/react";
import StaffCard from "../../../components/Card/StaffCard/StaffCard.component";

const StaffSearchComponent = ({
  type,
  searchParams,
  resetInput,
}: {
  type: string;
  searchParams: string;
  resetInput: () => void;
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["search", searchParams, type, searchParams === ""],
    queryFn: async ({ pageParam = 1 }) => {
      return anilistClient.request(getSearchStaff, {
        isDefault: searchParams === "",
        search: searchParams,
        perPage: 25,
        page: pageParam,
        // sort: CharacterSort.FavouritesDesc,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.queryPage?.pageInfo?.hasNextPage) {
        return (
          lastPage?.queryPage?.pageInfo?.currentPage && lastPage.queryPage.pageInfo.currentPage + 1
        );
      } else if (lastPage?.defaultPage?.pageInfo?.hasNextPage) {
        return (
          lastPage?.defaultPage?.pageInfo?.currentPage &&
          lastPage.defaultPage.pageInfo.currentPage + 1
        );
      }
      return false;
    },
  });

  if (searchParams && status === "success" && data?.pages[0]?.queryPage?.pageInfo?.total === 0) {
    return (
      <div className="my-32 text-center text-xl font-bold tracking-wider text-gray-300">
        No Results
      </div>
    );
  }
  return (
    <div className="my-5 xl:mx-auto xl:max-w-7xl">
      {searchParams && (
        <Chip
          value={searchParams}
          variant="filled"
          color="gray"
          className="mb-4"
          dismissible={{
            onClose: () => resetInput(),
          }}
        />
      )}
      {!searchParams && (
        <p className="mb-4 font-bold uppercase tracking-wider text-gray-400">Birthdays</p>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {/* Loader */}
        {status === "loading" && [...Array(25)].map(() => <VerticalCardLoader key={uuidv4()} />)}

        {/* Default Page */}
        {!searchParams &&
          data?.pages.map((page) => {
            return page?.defaultPage?.staff?.map((staff, i) => {
              return staff && <StaffCard staff={staff} key={`${staff.__typename}-${i}`} />;
            });
          })}

        {/* Search Results Page */}
        {searchParams &&
          data?.pages.map((page) => {
            return page?.queryPage?.staff?.map((staff, i) => {
              return staff && <StaffCard staff={staff} key={`${staff.__typename}-${i}`} />;
            });
          })}

        {/* Infinite Query Loader */}
        {isFetchingNextPage && [...Array(15)].map(() => <VerticalCardLoader key={uuidv4()} />)}
      </div>
      {hasNextPage && (
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

export default StaffSearchComponent;

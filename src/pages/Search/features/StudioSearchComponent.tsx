import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchStudios } from "../../../queries/getSearchMedia";
import { anilistClient } from "../../../queries/graphqlClient";
import { Button, Chip } from "@material-tailwind/react";
import StudioCard from "../../../components/Card/StudioCard/StudioCard.component";

const StudioSearchComponent = ({
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
      return anilistClient.request(getSearchStudios, {
        isDefault: searchParams === "",
        search: searchParams,
        perPage: 25,
        page: pageParam,
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
    <div className="my-5">
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
        <p className="mb-4 font-bold uppercase tracking-wider text-gray-400">Most Popular</p>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {/* Loader */}
        {status === "loading" &&
          [...Array(25)].map((_, index) => (
            <div key={index} className="h-16 w-full rounded bg-accent-gray-darkest"></div>
          ))}

        {/* Default Page */}
        {!searchParams &&
          data?.pages.map((page) => {
            return page?.defaultPage?.studios?.map((studio, i) => {
              return studio && <StudioCard studio={studio} key={`${studio.__typename}-${i}`} />;
            });
          })}

        {/* Search Results Page */}
        {searchParams &&
          data?.pages.map((page) => {
            return page?.queryPage?.studios?.map((studio, i) => {
              return studio && <StudioCard studio={studio} key={`${studio.__typename}-${i}`} />;
            });
          })}

        {/* Infinite Query Loader */}
        {isFetchingNextPage &&
          [...Array(15)].map(() => (
            <div className="h-20 w-full rounded bg-accent-gray-darkest"></div>
          ))}
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

export default StudioSearchComponent;
import { InfiniteData } from "@tanstack/react-query";
import { GetTrendingAnimeQuery } from "../../gql/graphql";
import VerticalCardLoader from "../Card/VerticalCard/VerticalCard.loader";
import { v4 as uuidv4 } from "uuid";
import SearchResultGrid from "../SearchResultGrid/SearchResultGrid";
import { Button, Chip } from "@material-tailwind/react";

type SearchResultsProps = {
  trendingAnime: InfiniteData<GetTrendingAnimeQuery> | undefined;
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  searchParams: string;
  resetInput: () => void;
};

const SearchResults = ({
  trendingAnime,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  searchParams,
  resetInput,
}: SearchResultsProps) => {
  if (isLoading)
    return (
      <div className="my-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {[...Array(9)].map(() => (
          <VerticalCardLoader key={uuidv4()} />
        ))}
      </div>
    );

  if (!isLoading && trendingAnime?.pages[0]?.Page?.pageInfo?.total === 0) {
    return (
      <div className="my-32 text-center text-xl font-bold tracking-wider text-gray-300">
        No Results
      </div>
    );
  }

  return (
    <div className="my-4">
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
      {trendingAnime?.pages.map((page) => {
        return <SearchResultGrid key={uuidv4()} media={page?.Page?.media} />;
      })}

      {isFetchingNextPage && (
        <div className="my-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {[...Array(9)].map(() => (
            <VerticalCardLoader key={uuidv4()} />
          ))}
        </div>
      )}

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

export default SearchResults;

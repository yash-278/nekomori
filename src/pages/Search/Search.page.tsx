import { GoSettings } from "react-icons/go";
import { Link } from "react-router-dom";
import MyListbox from "../../components/Listbox/listbox.component";
import { useAppDispatch, useAppSelector } from "../../hooks/customRedux";
import { setSearchType } from "../../store/reducer/search/search.slice";
import DefaultSearch from "./DefaultSearch.component";
import { BiCaretLeft } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { anilistClient } from "../../queries/graphqlClient";
import { getTrendingAnime } from "../../queries/getTrendingAnime";
import { debounce } from "../../utils/debounce";
import SearchResults from "../../components/SearchResults/SearchResults.component";
import { MediaType } from "../../gql/graphql";

const Search = () => {
  //* State
  const [searchParams, setSearchParams] = useState("");
  const searchTypes = [MediaType.Anime, MediaType.Manga];
  const searchInputRef = useRef<HTMLInputElement>(null);

  //* Hooks
  const { search, season, type } = useAppSelector((state) => state.search);

  const dispatch = useAppDispatch();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["search", searchParams, type],
      queryFn: async ({ pageParam = 1 }) => {
        return anilistClient.request(getTrendingAnime, {
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

  //* Logic
  const handleSetSearchParams = debounce((value) => {
    setSearchParams(value);
  }, 1000);

  function resetInput() {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      setSearchParams("");
    }
  }

  return (
    <div className="bg-accent-gray-black px-4 text-white">
      <Link
        to="/"
        className="navbar-brand hidden cursor-pointer text-2xl font-bold text-gray-100 no-underline hover:text-gray-200 lg:block"
      >
        Nekomori
      </Link>

      <div className="flex items-center">
        <BiCaretLeft
          size="2.2em"
          onClick={() => {
            window.history.back();
          }}
          className="cursor-pointer p-1"
        />
        <div className="flex items-center space-x-5 py-5">
          <h1 className="text-2xl font-bold">Browse</h1>
          <MyListbox
            defaultValue={type}
            rangeOfValues={searchTypes}
            setterFunction={(value) => {
              dispatch(setSearchType(value));
            }}
          />
        </div>
      </div>
      {/* Search Bar */}
      <div className="flex gap-x-4">
        <input
          type="text"
          onChange={(e) => {
            handleSetSearchParams(e.target.value);
          }}
          ref={searchInputRef}
          className="w-full rounded-md border-none bg-accent-gray-darkest text-sm text-gray-400"
          placeholder="Search"
        />
        <button className="rounded-md bg-accent-gray-darkest px-2 text-2xl text-accent-gray">
          <GoSettings />
        </button>
      </div>

      {!searchParams && <DefaultSearch />}

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

export default Search;

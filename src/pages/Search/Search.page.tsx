import { useQuery } from "@tanstack/react-query";
import { TextInput } from "flowbite-react";
import { GoSettings } from "react-icons/go";
import { Link } from "react-router-dom";
import CardGrid from "../../components/CardGrid/CardGrid.component";
import MyListbox from "../../components/Listbox/listbox.component";
import { useFragment } from "../../gql";
import { MediaSort, MediaType } from "../../gql/graphql";
import { useAppSelector } from "../../hooks/customRedux";
import { getTrendingAnime, MediaCardFragment } from "../../queries/getTrendingAnime";
import { anilistClient } from "../../queries/graphqlClient";
import { SearchState, setSearchType } from "../../store/reducer/search/search.slice";
const Search = () => {
  const { search, season, type } = useAppSelector((state) => state.search);

  const searchTypes = ["Anime", "Manga", "Characters", "People"];

  const {
    data: trendingAnime,
    isLoading,
    isRefetching,
    isError,
  } = useQuery(["trending", "anime"], async () =>
    anilistClient.request(getTrendingAnime, {
      page: 1,
      sort: [MediaSort.TrendingDesc, MediaSort.PopularityDesc],
      type: MediaType.Anime,
    })
  );

  // Get type of trendingAnime.Page.media
  return (
    <div className="bg-accent-gray-black px-4 text-white">
      <Link
        to="/"
        className="navbar-brand hidden cursor-pointer text-2xl font-bold text-gray-100 no-underline hover:text-gray-200 lg:block"
      >
        Nekomori
      </Link>

      <div className="flex items-center space-x-5 py-5">
        <h1 className="text-2xl font-bold">Browse</h1>
        <MyListbox
          defaultValue={type}
          rangeOfValues={searchTypes}
          setterFunction={(value) => {
            setSearchType(value);
          }}
        />
      </div>
      {/* Search Bar */}
      <div className="flex gap-x-4">
        <input
          type="text"
          name=""
          id=""
          className="w-full rounded-md border-none bg-accent-gray-darkest text-sm text-gray-400"
          placeholder="Search"
        />
        <button className="rounded-md bg-accent-gray-darkest px-2 text-2xl text-accent-gray">
          <GoSettings />
        </button>
      </div>
      {trendingAnime?.Page?.media && (
        <CardGrid
          title="Trending Now"
          link="/"
          linkTitle="View All"
          media={trendingAnime.Page.media}
          slice={6}
        />
      )}
      {/* Search Results */}
    </div>
  );
};

export default Search;

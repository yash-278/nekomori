import { GoSettings } from "react-icons/go";
import { Link } from "react-router-dom";
import MyListbox from "../../components/Listbox/listbox.component";
import { useAppDispatch, useAppSelector } from "../../hooks/customRedux";
import { setSearchType } from "../../store/reducer/search/search.slice";
import DefaultSearch from "./DefaultSearch.component";
import { BiCaretLeft } from "react-icons/bi";

const Search = () => {
  const { search, season, type } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const searchTypes = ["ANIME", "MANGA", "CHARACTER", "STAFF"];

  // Get type of trendingAnime.Page.media
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
          name=""
          id=""
          className="w-full rounded-md border-none bg-accent-gray-darkest text-sm text-gray-400"
          placeholder="Search"
        />
        <button className="rounded-md bg-accent-gray-darkest px-2 text-2xl text-accent-gray">
          <GoSettings />
        </button>
      </div>

      <DefaultSearch />

      {/* Search Results */}
    </div>
  );
};

export default Search;

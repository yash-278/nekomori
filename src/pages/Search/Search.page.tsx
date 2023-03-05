import { GoSettings } from "react-icons/go";
import { Link } from "react-router-dom";
import MyListbox from "../../components/Listbox/listbox.component";
import { useAppDispatch, useAppSelector } from "../../hooks/customRedux";
import { setSearchType } from "../../store/reducer/search/search.slice";
import { BiCaretLeft } from "react-icons/bi";
import { useRef, useState } from "react";
import { debounce } from "../../utils/debounce";
import { MediaType } from "../../gql/graphql";
import MediaSearchComponent from "./features/MediaSearchComponent";
import CharacterSearchComponent from "./features/CharacterSearchComponent";

const Search = () => {
  //* State
  const [searchParams, setSearchParams] = useState("");
  const searchTypes = [MediaType.Anime, MediaType.Manga, "CHARACTER"];
  const searchInputRef = useRef<HTMLInputElement>(null);

  //* Hooks
  const { type } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  //* Logic
  const handleSetSearchParams = debounce((value) => {
    setSearchParams(value);
  }, 500);

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
              resetInput();
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

      {/* Renders when it's either of Media Types : Anime | Manga */}
      {(type === MediaType.Anime || type === MediaType.Manga) && (
        <MediaSearchComponent searchParams={searchParams} type={type} resetInput={resetInput} />
      )}

      {/* Renders when it's Character */}
      {type === "CHARACTER" && (
        <CharacterSearchComponent type={type} searchParams={searchParams} resetInput={resetInput} />
      )}
    </div>
  );
};

export default Search;

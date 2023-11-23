import { GoSettings } from "react-icons/go";
import { Link } from "react-router-dom";
import MyListbox from "../../components/Listbox/listbox.component";
import { useAppDispatch, useAppSelector } from "../../hooks/customRedux";
import { SearchState, setSearchType } from "../../store/reducer/search/search.slice";
import { BiCaretLeft } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { debounce } from "../../utils/debounce";
import { MediaType } from "../../gql/graphql";
import MediaSearchComponent from "./features/MediaSearchComponent";
import CharacterSearchComponent from "./features/CharacterSearchComponent";
import StudioSearchComponent from "./features/StudioSearchComponent";
import StaffSearchComponent from "./features/StaffSearchComponent";
import SearchPageFilter from "./features/SearchPageFilter";
import { Genre } from "../../store/reducer/advancedSearch/advancedSearch.slice";
import { AnimatePresence, motion } from "framer-motion";
import useWindowDimensions from "../../hooks/useWindow";

export type AdvancedFilterType = {
  genres: Genre[];
};

const Search = () => {
  //* State
  const [searchParams, setSearchParams] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const searchTypes: SearchState["type"][] = [
    MediaType.Anime,
    MediaType.Manga,
    "CHARACTER",
    "STAFF",
    "STUDIO",
  ];
  const searchInputRef = useRef<HTMLInputElement>(null);

  //* Hooks
  const { type } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const windowHook = useWindowDimensions();

  useEffect(() => {
    if (windowHook.width > 1024) {
      setShowFilters(true);
    }
  }, [windowHook.width]);

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
    <motion.div
      className="bg-accent-gray-black px-4 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 1 } } }}
      key="search-page"
    >
      <div className="mx-auto max-w-7xl xl:flex xl:justify-between xl:py-5">
        <div className="xl:flex">
          <Link
            to="/"
            className="navbar-brand hidden cursor-pointer text-2xl font-bold text-gray-100 no-underline hover:text-gray-200 xl:block"
          >
            Nekomori
          </Link>

          <div className="flex items-center">
            <BiCaretLeft
              size="2.2em"
              onClick={() => {
                window.history.back();
              }}
              className="cursor-pointer p-1 xl:hidden"
            />
            <div className="flex items-center space-x-5 py-5 xl:py-0">
              <h1 className="text-2xl font-bold xl:hidden">Browse</h1>
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
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-x-4 xl:max-w-md xl:flex-grow xl:px-3">
          <input
            type="text"
            onChange={(e) => {
              handleSetSearchParams(e.target.value);
            }}
            ref={searchInputRef}
            className="w-full rounded-md border-none bg-accent-gray-darkest text-sm text-gray-400 shadow-md drop-shadow-md"
            placeholder="Search"
          />
          {(type === MediaType.Anime || type === MediaType.Manga) && (
            <motion.div
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="xl:hidden"
            >
              <button
                className="cursor-pointer rounded-md bg-accent-gray-darkest p-2 text-2xl text-accent-gray shadow-md drop-shadow-md"
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
              >
                <GoSettings />
              </button>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {(type === MediaType.Anime || type === MediaType.Manga) && showFilters && (
            <motion.div
              layout
              data-isopen={(type === MediaType.Anime || type === MediaType.Manga) && showFilters}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              key="search-filter-dropdown"
              className="my-auto overflow-y-hidden"
            >
              <SearchPageFilter />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Renders when it's either of Media Types : Anime | Manga */}
      {(type === MediaType.Anime || type === MediaType.Manga) && (
        <MediaSearchComponent searchParams={searchParams} type={type} resetInput={resetInput} />
      )}

      {/* Renders when it's Character */}
      {type === "CHARACTER" && (
        <CharacterSearchComponent type={type} searchParams={searchParams} resetInput={resetInput} />
      )}

      {/* Renders when it's Studio */}
      {type === "STUDIO" && (
        <StudioSearchComponent type={type} searchParams={searchParams} resetInput={resetInput} />
      )}

      {/* Renders when it's Staff */}
      {type === "STAFF" && (
        <StaffSearchComponent type={type} searchParams={searchParams} resetInput={resetInput} />
      )}
    </motion.div>
  );
};

export default Search;

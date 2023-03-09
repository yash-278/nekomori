import { Chip } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../../hooks/customRedux";
import useCheckFilters from "../../../hooks/useCheckFilters";
import {
  clearAllSearch,
  toggleGenreInSearch,
  toggleTagInSearch,
  toggleYearInSearch,
} from "../../../store/reducer/advancedSearch/advancedSearch.slice";

const SearchFilterChips = ({
  searchParams,
  resetInput,
}: {
  searchParams: string;
  resetInput: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { genres, tags, year } = useAppSelector((state) => state.advancedSearch);
  const { checkIfFiltersAreActive } = useCheckFilters(searchParams);
  return (
    <div className="mb-3 flex flex-wrap gap-x-2">
      {searchParams && (
        <Chip
          value={searchParams}
          variant="filled"
          color="blue-gray"
          className="mb-2 text-xs"
          dismissible={{
            onClose: () => resetInput(),
          }}
        />
      )}

      {genres.map((genre, index) => (
        <Chip
          value={genre}
          variant="filled"
          color="indigo"
          className="mb-2"
          dismissible={{
            onClose: () => dispatch(toggleGenreInSearch(genre)),
          }}
          key={(genre + index).toString()}
        />
      ))}

      {tags.map((tag, index) => (
        <Chip
          value={tag}
          variant="filled"
          color="indigo"
          className="mb-2"
          dismissible={{
            onClose: () => dispatch(toggleTagInSearch(tag)),
          }}
          key={(tag + index).toString()}
        />
      ))}

      {year[0] !== "" && (
        <Chip
          value={year[0]}
          variant="filled"
          color="indigo"
          className="mb-2"
          dismissible={{
            onClose: () => dispatch(toggleYearInSearch(year[0])),
          }}
        />
      )}

      {checkIfFiltersAreActive() && (
        <Chip
          value="Clear All"
          variant="filled"
          color="blue-gray"
          className="mb-2"
          dismissible={{
            onClose: () => dispatch(clearAllSearch()),
          }}
        />
      )}
    </div>
  );
};

export default SearchFilterChips;

import { Chip } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../../hooks/customRedux";
import { toggleGenreInSearch } from "../../../store/reducer/advancedSearch/advancedSearch.slice";

const SearchFilterChips = ({
  searchParams,
  resetInput,
}: {
  searchParams: string;
  resetInput: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { genres } = useAppSelector((state) => state.advancedSearch);

  return (
    <div className="mb-3 space-x-2">
      {searchParams && (
        <Chip
          value={searchParams}
          variant="filled"
          color="blue-gray"
          className="mb-2"
          dismissible={{
            onClose: () => resetInput(),
          }}
        />
      )}

      {genres.map((genre) => (
        <Chip
          value={genre}
          variant="filled"
          color="blue-gray"
          className="mb-2"
          dismissible={{
            onClose: () => dispatch(toggleGenreInSearch(genre)),
          }}
        />
      ))}
    </div>
  );
};

export default SearchFilterChips;

import { Chip } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../../hooks/customRedux";
import {
  toggleGenreInSearch,
  toggleTagInSearch,
} from "../../../store/reducer/advancedSearch/advancedSearch.slice";

const SearchFilterChips = ({
  searchParams,
  resetInput,
}: {
  searchParams: string;
  resetInput: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { genres, tags } = useAppSelector((state) => state.advancedSearch);

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

      {genres.map((genre, index) => (
        <Chip
          value={genre}
          variant="filled"
          color="blue-gray"
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
          color="blue-gray"
          className="mb-2"
          dismissible={{
            onClose: () => dispatch(toggleTagInSearch(tag)),
          }}
          key={(tag + index).toString()}
        />
      ))}
    </div>
  );
};

export default SearchFilterChips;

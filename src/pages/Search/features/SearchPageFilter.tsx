import { ComponentPropsWithoutRef } from "react";
import SelectModal from "../../../components/SelectModal/SelectModal";
import { allGenres } from "../../../constants/genres";
import { useAppDispatch, useAppSelector } from "../../../hooks/customRedux";
import { toggleGenreInSearch } from "../../../store/reducer/advancedSearch/advancedSearch.slice";

export type SearchPageFilterProps = ComponentPropsWithoutRef<"div"> & {};

const SearchPageFilter = (props: SearchPageFilterProps) => {
  const { genres } = useAppSelector((state) => state.advancedSearch);

  const dispatch = useAppDispatch();

  return (
    <div className="my-5 w-72">
      <SelectModal
        options={allGenres}
        title={"Genres"}
        selectedOptions={genres}
        toggleFunction={(value) => {
          dispatch(toggleGenreInSearch(value));
        }}
      />
    </div>
  );
};

export default SearchPageFilter;

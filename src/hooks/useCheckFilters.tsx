import { useAppSelector } from "./customRedux";

const useCheckFilters = (searchParams: string) => {
  const { genres, tags, year } = useAppSelector((state) => state.advancedSearch);

  const checkIfFiltersAreActive = () => {
    let filtersAreActive = false;

    if (genres.length > 0 || tags.length > 0 || year[0] !== "") {
      filtersAreActive = true;
    }
    if (searchParams) {
      filtersAreActive = true;
    }

    return filtersAreActive;
  };

  return { checkIfFiltersAreActive } as const;
};

export default useCheckFilters;

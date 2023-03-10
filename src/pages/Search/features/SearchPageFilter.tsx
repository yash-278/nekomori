import { useQuery } from "@tanstack/react-query";
import { ComponentPropsWithoutRef } from "react";
import SelectModal from "../../../components/SelectModal/SelectModal";
import { allGenres } from "../../../constants/genres";
import { GetAllMediaTagsQuery } from "../../../gql/graphql";
import { useAppDispatch, useAppSelector } from "../../../hooks/customRedux";
import { getAllMediaTags } from "../../../queries/getFilterData";
import { anilistClient } from "../../../queries/graphqlClient";
import {
  toggleGenreInSearch,
  toggleSeasonInSearch,
  toggleTagInSearch,
  toggleYearInSearch,
} from "../../../store/reducer/advancedSearch/advancedSearch.slice";
import { getYears } from "../../../utils/season";

export type SearchPageFilterProps = ComponentPropsWithoutRef<"div"> & {};

const SearchPageFilter = (props: SearchPageFilterProps) => {
  const { genres, tags, year, season } = useAppSelector((state) => state.advancedSearch);

  const dispatch = useAppDispatch();

  const { data: fetchedTags } = useQuery(["filter-tags"], async () =>
    anilistClient.request(getAllMediaTags)
  );

  const convertTagsToArray = (tags: GetAllMediaTagsQuery | undefined) => {
    if (!tags?.MediaTagCollection || null) return [];

    return tags?.MediaTagCollection?.map((tag) => {
      return tag?.name;
    });
  };

  return (
    <div className="scrollbar-hide flex snap-x space-x-4 overflow-y-clip overflow-x-scroll pt-5">
      <SelectModal
        options={allGenres}
        title={"Genres"}
        className="snap-start"
        selectedOptions={genres}
        toggleFunction={(value) => {
          dispatch(toggleGenreInSearch(value));
        }}
      />

      <SelectModal
        options={["WINTER", "SPRING", "SUMMER", "FALL"]}
        title={"Season"}
        selectedOptions={season}
        toggleFunction={(value) => {
          dispatch(toggleSeasonInSearch(value));
        }}
      />
      {fetchedTags?.MediaTagCollection && (
        <SelectModal
          options={convertTagsToArray(fetchedTags)}
          title={"Tags"}
          selectedOptions={tags}
          toggleFunction={(value) => {
            dispatch(toggleTagInSearch(value));
          }}
        />
      )}

      <SelectModal
        options={getYears().reverse()}
        title={"Year"}
        selectedOptions={year}
        toggleFunction={(value) => {
          dispatch(toggleYearInSearch(value));
        }}
      />
    </div>
  );
};

export default SearchPageFilter;

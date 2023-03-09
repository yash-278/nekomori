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
  toggleTagInSearch,
} from "../../../store/reducer/advancedSearch/advancedSearch.slice";

export type SearchPageFilterProps = ComponentPropsWithoutRef<"div"> & {};

const SearchPageFilter = (props: SearchPageFilterProps) => {
  const { genres, tags } = useAppSelector((state) => state.advancedSearch);

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
    <div className="my-5 flex space-x-4">
      <SelectModal
        options={allGenres}
        title={"Genres"}
        selectedOptions={genres}
        toggleFunction={(value) => {
          dispatch(toggleGenreInSearch(value));
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
    </div>
  );
};

export default SearchPageFilter;

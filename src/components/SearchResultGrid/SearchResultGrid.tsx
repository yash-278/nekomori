import VerticalCard from "../Card/VerticalCard/VerticalCard.component";
import { v4 as uuidv4 } from "uuid";
import { MediaFieldsFragment } from "../../gql/graphql";
export type SearchResultGridProps = {
  // Pass any dynamic array of fragments
  media:
    | (
        | ({ __typename?: "Media" | undefined } & {
            " $fragmentRefs"?: { MediaFieldsFragment: MediaFieldsFragment } | undefined;
          })
        | null
      )[]
    | null
    | undefined;
};
const SearchResultGrid = (props: SearchResultGridProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {props.media &&
          props.media.map((item, index) => item && <VerticalCard key={uuidv4()} media={item} />)}
      </div>
    </div>
  );
};

export default SearchResultGrid;

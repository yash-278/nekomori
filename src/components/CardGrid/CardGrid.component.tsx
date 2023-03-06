import { Link } from "react-router-dom";

import MediaCard from "../Card/MediaCard/MediaCard.component";
import VerticalCardLoader from "../Card/MediaCard/VerticalCard.loader";
import { v4 as uuidv4 } from "uuid";
import { MediaFieldsFragment } from "../../gql/graphql";

export type CardGridProps = {
  title?: string;
  link?: string;
  linkTitle?: string;
  slice?: number;
  loading: {
    isLoading: boolean;
    isRefetching?: boolean;
  };
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

const CardGrid = (props: CardGridProps) => {
  return (
    <div>
      <div className="mt-5 mb-4 flex items-center justify-between">
        <p className="font-bold uppercase tracking-wider text-gray-400">{props.title}</p>
        {props.link && (
          <Link to={props.link} className="text-xs font-semibold tracking-wider text-gray-500">
            {props.linkTitle}
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {/* Loading */}
        {props.loading.isLoading &&
          [...Array(props.slice || 6)].map((e, i) => <VerticalCardLoader key={uuidv4()} />)}

        {props.media &&
          props.media
            .slice(0, props.slice || props.media.length)
            .map((item, index) => item && <MediaCard key={uuidv4()} media={item} />)}
      </div>
    </div>
  );
};

export default CardGrid;

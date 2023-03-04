import { Link } from "react-router-dom";
import { MediaCardFieldsFragment } from "../../gql/graphql";
import VerticalCard from "../Card/VerticalCard/VerticalCard.component";
import VerticalCardLoader from "../Card/VerticalCard/VerticalCard.loader";
import { v4 as uuidv4 } from "uuid";

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
            " $fragmentRefs"?: { MediaCardFieldsFragment: MediaCardFieldsFragment } | undefined;
          })
        | null
      )[]
    | null
    | undefined;
};

const CardGrid = (props: CardGridProps) => {
  return (
    <div>
      <div className="my-4 flex items-center justify-between">
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
            .map((item, index) => item && <VerticalCard key={uuidv4()} media={item} />)}
      </div>
    </div>
  );
};

export default CardGrid;

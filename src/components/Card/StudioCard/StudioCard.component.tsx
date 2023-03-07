import { Link } from "react-router-dom";
import { FragmentType, graphql, useFragment } from "../../../gql";

interface StudioCardProps {
  studio: FragmentType<typeof StudioCardFragment>;
  className?: string;
}

const StudioCard = (props: StudioCardProps) => {
  const studio = useFragment(StudioCardFragment, props.studio);
  return (
    <Link
      to={studio?.siteUrl || ""}
      key={studio?.id}
      className="flex h-full items-center justify-center rounded bg-accent-gray-darkest py-2 px-1 text-center text-base font-semibold"
    >
      <p className="my-auto break-words text-gray-500" title={studio?.name || ""}>
        {studio?.name || ""}
      </p>
    </Link>
  );
};

export const StudioCardFragment = graphql(/* GraphQL */ `
  fragment StudioItem on Studio {
    id
    name
    siteUrl
    isAnimationStudio
    favourites
    isFavourite
    media(isMain: true, sort: POPULARITY_DESC) {
      nodes {
        id
        coverImage {
          large
          color
          medium
        }
      }
    }
  }
`);

export default StudioCard;

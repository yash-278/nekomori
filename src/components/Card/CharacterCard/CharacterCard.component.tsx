import { Link } from "react-router-dom";
import { FragmentType, graphql, useFragment } from "../../../gql";
import ImageLoader from "../../ImageLoader/ImageLoader.component";

const CharacterCard = (props: { character: FragmentType<typeof CharacterCardFragment> }) => {
  const character = useFragment(CharacterCardFragment, props.character);
  return (
    <Link to={character?.siteUrl || ""}>
      <div className="aspect-w-3 aspect-h-4">
        <ImageLoader src={character?.image?.large || ""} />
      </div>

      <div className="mt-2">
        <p
          className="text-xs font-semibold text-gray-500 line-clamp-2 md:text-sm"
          title={character?.name?.userPreferred || character?.name?.full || ""}
        >
          {character?.name?.userPreferred || character?.name?.full || ""}
        </p>
      </div>
    </Link>
  );
};

export const CharacterCardFragment = graphql(/* GraphQL */ `
  fragment CharacterItem on Character {
    id
    name {
      first
      middle
      last
      full
      native
      userPreferred
    }
    image {
      large
      medium
    }
    siteUrl
  }
`);

export default CharacterCard;

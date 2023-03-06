import { Link } from "react-router-dom";
import { FragmentType, graphql, useFragment } from "../../../gql";
import ImageLoader from "../../ImageLoader/ImageLoader.component";

const MediaCard = (props: { media: FragmentType<typeof MediaFieldsFragment> }) => {
  const media = useFragment(MediaFieldsFragment, props.media);
  return (
    <Link to={media?.siteUrl || ""} key={media?.id}>
      <div className="aspect-w-3 aspect-h-4">
        <ImageLoader src={media?.coverImage?.large || ""} />
      </div>

      <div className="mt-2">
        <p
          className="text-xs font-semibold text-gray-500 line-clamp-2 md:text-sm"
          title={media?.title?.english || media?.title?.romaji || ""}
        >
          {media?.title?.english || media?.title?.romaji}
        </p>
      </div>
    </Link>
  );
};

export const MediaFieldsFragment = graphql(/* GraphQL */ `
  fragment MediaFields on Media {
    id
    title {
      userPreferred
      english
      romaji
    }
    coverImage {
      extraLarge
      large
      color
    }
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    bannerImage
    season
    seasonYear
    description
    type
    format
    status(version: 2)
    episodes
    duration
    chapters
    volumes
    genres
    isAdult
    averageScore
    popularity
    source
    siteUrl
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    mediaListEntry {
      id
      status
    }
    studios(isMain: true) {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
  }
`);

export default MediaCard;

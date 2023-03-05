import { graphql } from "../../gql";

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

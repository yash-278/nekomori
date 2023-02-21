import { graphql } from "../gql";
export const getAnime = graphql(/* GraphQL */ `
  query getAnime($season: MediaSeason!, $seasonYear: Int!) {
    Page(page: 1, perPage: 15) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(season: $season, type: ANIME, seasonYear: $seasonYear, sort: POPULARITY_DESC) {
        ...MediaFields
      }
    }
  }
`);

export const MediaFragment = graphql(/* GraphQL */ `
  fragment MediaFields on Media {
    id
    status
    episodes
    coverImage {
      large
      color
    }
    studios {
      edges {
        id
        isMain @include(if: true)
        node {
          name
        }
      }
    }
    source
    description
    nextAiringEpisode {
      id
      episode
      timeUntilAiring
    }
    title {
      english
      romaji
    }
    startDate {
      year
      month
      day
    }
    genres
  }
`);

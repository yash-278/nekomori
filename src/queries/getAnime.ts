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

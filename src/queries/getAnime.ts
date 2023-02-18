import { graphql } from "../gql";
export const getAnime = graphql(
  /* GraphQL */
  `
    query getAnime($page: Int!, $perPage: Int!) {
      Page(page: $page, perPage: $perPage) {
        media {
          ...MediaFields
        }
      }
    }
  `
);

export const MediaFragment = graphql(/* GraphQL */ `
  fragment MediaFields on Media {
    id
    title {
      romaji
      english
      native
    }
  }
`);

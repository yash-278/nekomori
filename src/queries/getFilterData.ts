import { graphql } from "../gql";

export const getAllMediaTags = graphql(/* GraphQL */ `
  query getAllMediaTags {
    MediaTagCollection {
      id
      name
      isGeneralSpoiler
      isMediaSpoiler
      isAdult
      __typename
    }
  }
`);

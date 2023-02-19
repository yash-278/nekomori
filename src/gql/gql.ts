/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n    query getAnime($season: MediaSeason!, $seasonYear: Int!) {\n      Page(page: 1, perPage: 15) {\n        pageInfo {\n          total\n          currentPage\n          lastPage\n          hasNextPage\n          perPage\n        }\n        media(season: $season, type: ANIME, seasonYear: $seasonYear, sort: POPULARITY_DESC) {\n          ...MediaFields\n        }\n      }\n    }\n  ": types.GetAnimeDocument,
    "\n  fragment MediaFields on Media {\n    id\n    status\n    episodes\n    coverImage {\n      large\n      color\n    }\n    studios {\n      edges {\n        id\n        isMain @include(if: true)\n        node {\n          name\n        }\n      }\n    }\n    source\n    description\n    nextAiringEpisode {\n      id\n      episode\n      timeUntilAiring\n    }\n    title {\n      english\n      romaji\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    genres\n  }\n": types.MediaFieldsFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getAnime($season: MediaSeason!, $seasonYear: Int!) {\n      Page(page: 1, perPage: 15) {\n        pageInfo {\n          total\n          currentPage\n          lastPage\n          hasNextPage\n          perPage\n        }\n        media(season: $season, type: ANIME, seasonYear: $seasonYear, sort: POPULARITY_DESC) {\n          ...MediaFields\n        }\n      }\n    }\n  "): (typeof documents)["\n    query getAnime($season: MediaSeason!, $seasonYear: Int!) {\n      Page(page: 1, perPage: 15) {\n        pageInfo {\n          total\n          currentPage\n          lastPage\n          hasNextPage\n          perPage\n        }\n        media(season: $season, type: ANIME, seasonYear: $seasonYear, sort: POPULARITY_DESC) {\n          ...MediaFields\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MediaFields on Media {\n    id\n    status\n    episodes\n    coverImage {\n      large\n      color\n    }\n    studios {\n      edges {\n        id\n        isMain @include(if: true)\n        node {\n          name\n        }\n      }\n    }\n    source\n    description\n    nextAiringEpisode {\n      id\n      episode\n      timeUntilAiring\n    }\n    title {\n      english\n      romaji\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    genres\n  }\n"): (typeof documents)["\n  fragment MediaFields on Media {\n    id\n    status\n    episodes\n    coverImage {\n      large\n      color\n    }\n    studios {\n      edges {\n        id\n        isMain @include(if: true)\n        node {\n          name\n        }\n      }\n    }\n    source\n    description\n    nextAiringEpisode {\n      id\n      episode\n      timeUntilAiring\n    }\n    title {\n      english\n      romaji\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    genres\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
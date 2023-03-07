import { graphql } from "../gql";

export const getSearchMedia = graphql(/* GraphQL */ `
  query getSearchMedia(
    $page: Int = 1
    $perPage: Int = 20
    $id: Int
    $type: MediaType
    $isAdult: Boolean = false
    $search: String
    $format: [MediaFormat]
    $status: MediaStatus
    $countryOfOrigin: CountryCode
    $source: MediaSource
    $season: MediaSeason
    $seasonYear: Int
    $year: String
    $onList: Boolean
    $yearLesser: FuzzyDateInt
    $yearGreater: FuzzyDateInt
    $episodeLesser: Int
    $episodeGreater: Int
    $durationLesser: Int
    $durationGreater: Int
    $chapterLesser: Int
    $chapterGreater: Int
    $volumeLesser: Int
    $volumeGreater: Int
    $licensedBy: [Int]
    $isLicensed: Boolean
    $genres: [String]
    $excludedGenres: [String]
    $tags: [String]
    $excludedTags: [String]
    $minimumTagRank: Int
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(
        id: $id
        type: $type
        season: $season
        format_in: $format
        status: $status
        countryOfOrigin: $countryOfOrigin
        source: $source
        search: $search
        onList: $onList
        seasonYear: $seasonYear
        startDate_like: $year
        startDate_lesser: $yearLesser
        startDate_greater: $yearGreater
        episodes_lesser: $episodeLesser
        episodes_greater: $episodeGreater
        duration_lesser: $durationLesser
        duration_greater: $durationGreater
        chapters_lesser: $chapterLesser
        chapters_greater: $chapterGreater
        volumes_lesser: $volumeLesser
        volumes_greater: $volumeGreater
        licensedById_in: $licensedBy
        isLicensed: $isLicensed
        genre_in: $genres
        genre_not_in: $excludedGenres
        tag_in: $tags
        tag_not_in: $excludedTags
        minimumTagRank: $minimumTagRank
        sort: $sort
        isAdult: $isAdult
      ) {
        ...MediaFields
      }
    }
  }
`);

export const getSearchCharacters = graphql(/* GraphQL */ `
  query getSearchCharacters(
    $page: Int = 1
    $perPage: Int = 20
    # $id: Int
    $isDefault: Boolean!
    $search: String
    $sort: [CharacterSort]
  ) {
    queryPage: Page(page: $page, perPage: $perPage) @skip(if: $isDefault) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
        __typename
      }

      characters(search: $search, sort: SEARCH_MATCH) {
        __typename
        id
        ...CharacterItem
      }
    }
    defaultPage: Page(page: $page, perPage: $perPage) @include(if: $isDefault) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
        __typename
      }

      characters(sort: $sort) {
        __typename
        ...CharacterItem
      }
    }
  }
`);

export const getSearchStudios = graphql(/* GraphQL */ `
  query getSearchStudios(
    $page: Int = 1
    $perPage: Int = 20
    $isDefault: Boolean!
    $search: String
    $sort: [StudioSort] = [FAVOURITES_DESC]
  ) {
    queryPage: Page(page: $page, perPage: $perPage) @skip(if: $isDefault) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
        __typename
      }
      studios(search: $search, sort: SEARCH_MATCH) {
        ...StudioItem
      }
    }
    defaultPage: Page(page: $page, perPage: $perPage) @include(if: $isDefault) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
        __typename
      }
      studios(sort: $sort) {
        ...StudioItem
      }
    }
  }
`);

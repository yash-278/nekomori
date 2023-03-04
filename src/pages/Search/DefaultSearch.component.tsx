import { useQuery } from "@tanstack/react-query";
import React from "react";
import CardGrid from "../../components/CardGrid/CardGrid.component";
import { MediaSort, MediaType } from "../../gql/graphql";
import { getTrendingAnime } from "../../queries/getTrendingAnime";
import { anilistClient } from "../../queries/graphqlClient";
import { getCurrentSeason, getNextSeason, getNextSeasonYear } from "../../utils/season";

const DefaultSearch = () => {
  const {
    data: trendingAnime,
    isLoading: isLoadingTrendingAnime,
    isRefetching: isRefetchingTrendingAnime,
    isError: isErrorTrendingAnime,
  } = useQuery(["trending", "anime"], async () =>
    anilistClient.request(getTrendingAnime, {
      page: 1,
      sort: [MediaSort.TrendingDesc, MediaSort.PopularityDesc],
      type: MediaType.Anime,
    })
  );

  const {
    data: popularCurrentSeasonAnime,
    isLoading: isLoadingPopularCurrentSeasonAnime,
    isRefetching: isRefetchingPopularCurrentSeasonAnime,
    isError: isErrorPopularCurrentSeasonAnime,
  } = useQuery(["popular", "currentSeason", "anime"], async () =>
    anilistClient.request(getTrendingAnime, {
      page: 1,
      season: getCurrentSeason(),
      seasonYear: new Date().getFullYear(),
      type: MediaType.Anime,
    })
  );

  const {
    data: upcomingNextSeasonAnime,
    isLoading: isLoadingUpcomingNextSeasonAnime,
    isRefetching: isRefetchingUpcomingNextSeasonAnime,
    isError: isErrorUpcomingNextSeasonAnime,
  } = useQuery(["upcoming", "nextSeason", "anime"], async () =>
    anilistClient.request(getTrendingAnime, {
      page: 1,
      season: getNextSeason(),
      seasonYear: getNextSeasonYear(),
      type: MediaType.Anime,
    })
  );

  const {
    data: popularAnime,
    isLoading: isLoadingPopularAnime,
    isRefetching: isRefetchingPopularAnime,
    isError: isErrorPopularAnime,
  } = useQuery(["popular", "anime"], async () =>
    anilistClient.request(getTrendingAnime, {
      page: 1,
      sort: [MediaSort.PopularityDesc],
      type: MediaType.Anime,
    })
  );
  return (
    <div className="space-y-10">
      <CardGrid
        title="Trending Now"
        link="/"
        linkTitle="View All"
        media={trendingAnime?.Page?.media}
        slice={6}
        loading={{ isLoading: isLoadingTrendingAnime, isRefetching: isRefetchingTrendingAnime }}
      />

      <CardGrid
        title="Popular This Season"
        link="/"
        linkTitle="View All"
        media={popularCurrentSeasonAnime?.Page?.media}
        slice={6}
        loading={{
          isLoading: isLoadingPopularCurrentSeasonAnime,
          isRefetching: isRefetchingPopularCurrentSeasonAnime,
        }}
      />

      <CardGrid
        title="Upcoming Next Season"
        link="/"
        linkTitle="View All"
        media={upcomingNextSeasonAnime?.Page?.media}
        slice={6}
        loading={{
          isLoading: isLoadingUpcomingNextSeasonAnime,
          isRefetching: isRefetchingUpcomingNextSeasonAnime,
        }}
      />

      <CardGrid
        title="Popular Anime"
        link="/"
        linkTitle="View All"
        media={popularAnime?.Page?.media}
        slice={6}
        loading={{ isLoading: isLoadingPopularAnime, isRefetching: isRefetchingPopularAnime }}
      />
    </div>
  );
};

export default DefaultSearch;

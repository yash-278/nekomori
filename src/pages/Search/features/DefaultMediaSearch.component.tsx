import { useQuery } from "@tanstack/react-query";
import CardGrid from "../../../components/CardGrid/CardGrid.component";
import { MediaSort, MediaType } from "../../../gql/graphql";
import { getTrendingAnime } from "../../../queries/getTrendingAnime";
import { anilistClient } from "../../../queries/graphqlClient";
import { getCurrentSeason, getNextSeason, getNextSeasonYear } from "../../../utils/season";

const DefaultMediaSearch = ({ type }: { type: MediaType }) => {
  const {
    data: trendingAnime,
    isLoading: isLoadingTrendingAnime,
    isRefetching: isRefetchingTrendingAnime,
  } = useQuery(["trending", type], async () =>
    anilistClient.request(getTrendingAnime, {
      page: 1,
      sort: [MediaSort.TrendingDesc, MediaSort.PopularityDesc],
      type: type,
    })
  );

  const {
    data: popularCurrentSeasonAnime,
    isLoading: isLoadingPopularCurrentSeasonAnime,
    isRefetching: isRefetchingPopularCurrentSeasonAnime,
  } = useQuery(["popular", "currentSeason", type], async () =>
    anilistClient.request(getTrendingAnime, {
      page: 1,
      season: getCurrentSeason(),
      seasonYear: new Date().getFullYear(),
      type: type,
    })
  );

  const {
    data: upcomingNextSeasonAnime,
    isLoading: isLoadingUpcomingNextSeasonAnime,
    isRefetching: isRefetchingUpcomingNextSeasonAnime,
  } = useQuery(["upcoming", "nextSeason", type], async () =>
    anilistClient.request(getTrendingAnime, {
      page: 1,
      season: getNextSeason(),
      seasonYear: getNextSeasonYear(),
      type: type,
    })
  );

  const {
    data: popularAnime,
    isLoading: isLoadingPopularAnime,
    isRefetching: isRefetchingPopularAnime,
  } = useQuery(["popular", type], async () =>
    anilistClient.request(getTrendingAnime, {
      page: 1,
      sort: [MediaSort.PopularityDesc],
      type: type,
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

      {type === MediaType.Anime && (
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
      )}

      {type === MediaType.Anime && (
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
      )}

      <CardGrid
        title="All time Popular"
        link="/"
        linkTitle="View All"
        media={popularAnime?.Page?.media}
        slice={6}
        loading={{ isLoading: isLoadingPopularAnime, isRefetching: isRefetchingPopularAnime }}
      />
    </div>
  );
};

export default DefaultMediaSearch;

import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import HorizontalCard from "../../components/Card/HorizontalCard.component";
import { useAppSelector } from "../../hooks/customRedux";
import { getAnime } from "../../queries/getAnime";
import { anilistClient } from "../../queries/graphqlClient";
import "./schedule.styles.css";

function Schedule() {
  const { currentSeason, currentYear } = useAppSelector((state) => state.season);

  const { data, isLoading, isRefetching, isError } = useQuery(
    ["schedule", currentSeason, currentYear],
    async () =>
      anilistClient.request(getAnime, {
        season: currentSeason,
        seasonYear: Number(currentYear),
      })
  );

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading || isRefetching) {
    return (
      <div className="mt-10 w-screen text-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="directory-menu px-4 py-4 lg:px-12 lg:py-5">
      <div className="mb-16 grid gap-5 md:grid-cols-2 lg:mb-auto lg:grid-cols-3">
        {data?.Page?.media?.map(
          (anime, index) => anime && <HorizontalCard anime={anime} key={`anime-${index}`} />
        )}
      </div>
    </div>
  );
}

export default Schedule;

import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import HorizontalCard from "../../components/Card/HorizontalCard.component";
import { useAppSelector } from "../../hooks/customRedux";
import { getAnime } from "../../queries/getAnime";
import { anilistClient } from "../../queries/graphqlClient";
import "./browse.styles.css";

function Browse() {
  const { currentSeason, currentYear } = useAppSelector((state) => state.season);

  const { data, isLoading, isRefetching, isError } = useQuery(
    ["browse", currentSeason, currentYear],
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
      <div className="w-screen mt-10 text-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="directory-menu px-4 py-4 lg:px-12 lg:py-5">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 lg:mb-auto">
        {data?.Page?.media?.map(
          (anime, index) => anime && <HorizontalCard anime={anime} key={`anime-${index}`} />
        )}
      </div>
    </div>
  );
}

export default Browse;

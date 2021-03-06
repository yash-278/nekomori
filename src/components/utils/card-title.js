import { monthText } from "./month";
import Time from "./time.component";

export function cardTitle(anime) {
  switch (anime.status) {
    case "FINISHED":
      return (
        <div>
          <p className="text-left text-xs">{`${anime.episodes} Episodes aired on`}</p>
          <div className="text-left text-sm md:text-lg font-bold ep-time">
            {monthText(anime.startDate.year, anime.startDate.month, anime.startDate.day)}
          </div>
        </div>
      );
    case "RELEASING":
      return (
        <div>
          <p className="text-left text-xs">{`Ep ${
            anime.nextAiringEpisode ? anime.nextAiringEpisode.episode : "0"
          } airing in`}</p>
          {anime.nextAiringEpisode ? (
            <Time seconds={anime.nextAiringEpisode.timeUntilAiring} />
          ) : (
            <div className="text-left text-sm md:text-lg font-bold ep-time">TBA</div>
          )}
        </div>
      );
    case "NOT_YET_RELEASED":
      return (
        <div>
          <p className="text-left text-xs">{`Anime airing on`}</p>
          <div className="text-left text-sm md:text-lg font-bold ep-time">
            {monthText(anime.startDate.year, anime.startDate.month, anime.startDate.day)}
          </div>
        </div>
      );
    default:
      return "NOT YET Released";
  }
}

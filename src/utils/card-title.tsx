import humanizeDuration from "humanize-duration";
import { MediaFieldsFragment } from "../components/Card/MediaCard/MediaCard.component";
import { FragmentType, useFragment } from "../gql";

const Time = (props: { seconds: number }) => {
  const milliSecs = props.seconds * 1000;
  return (
    <div className="ep-time text-left text-sm font-bold md:text-lg">
      {humanizeDuration(milliSecs, { units: ["d", "h"], round: true })}
    </div>
  );
};

function monthText(year?: number | null, month?: number | null, day?: number | null) {
  let dateLast;
  let format: {
    year: "numeric";
    month?: "long";
    day?: "numeric";
  };
  if (year && month && day) {
    dateLast = `${year}-${month}-${day}`;
    format = { year: "numeric", month: "long", day: "numeric" };
  } else if (year && month) {
    dateLast = `${year}-${month}`;
    format = { year: "numeric", month: "long" };
  } else if (year) {
    dateLast = `${year}`;
    format = { year: "numeric" };
  } else {
    return "TBA";
  }

  var dateConvert = new Date(dateLast).toLocaleDateString("en-US", format);
  return dateConvert;
}

export function cardTitle(props: { anime: FragmentType<typeof MediaFieldsFragment> }) {
  const anime = useFragment(MediaFieldsFragment, props.anime);

  const { startDate, nextAiringEpisode } = anime;

  switch (anime.status) {
    case "FINISHED":
      return (
        <div>
          <p className="text-left text-xs">{`${anime.episodes} Episodes aired on`}</p>
          <div className="ep-time text-left text-sm font-bold md:text-lg">
            {monthText(startDate?.year, startDate?.month, startDate?.day)}
          </div>
        </div>
      );
    case "RELEASING":
      return (
        <div>
          <p className="text-left text-xs">{`Ep ${
            nextAiringEpisode ? nextAiringEpisode.episode : "0"
          } airing in`}</p>
          {anime.nextAiringEpisode ? (
            <Time seconds={anime.nextAiringEpisode.timeUntilAiring} />
          ) : (
            <div className="ep-time text-left text-sm font-bold md:text-lg">TBA</div>
          )}
        </div>
      );
    case "NOT_YET_RELEASED":
      return (
        <div>
          <p className="text-left text-xs">{`Anime airing on`}</p>
          <div className="ep-time text-left text-sm font-bold md:text-lg">
            {monthText(startDate?.year, startDate?.month, startDate?.day)}
          </div>
        </div>
      );
    default:
      return "NOT YET Released";
  }
}

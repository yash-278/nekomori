import { FragmentType, useFragment } from "../../gql/fragment-masking";
import { MediaFragment } from "../../queries/getAnime";
import { cardTitle } from "../../utils/card-title";

import "./HorizontalCard.styles.css";

function HorizontalCard(props: { anime: FragmentType<typeof MediaFragment> }) {
  const anime = useFragment(MediaFragment, props.anime);

  if (!anime || anime === null) {
    return null;
  }

  function createMarkup() {
    if (!anime.description) return { __html: "" };
    return { __html: anime.description };
  }

  function getName() {
    return anime?.title?.english ? anime.title.english : anime?.title?.romaji;
  }

  function getColor() {
    return anime?.coverImage?.color ? anime.coverImage.color : "#fff";
  }

  return (
    <div className="bg-accent-gray-darkest h-60 md:h-64 flex w-auto rounded-md text-gray-300 overflow-hidden transition duration-300 ease-in-out transform hover:scale-101 hover:shadow-2xl elementToFadeInAndOut">
      {/* Card Image */}
      <div className="relative w-64 aspect-w-16 aspect-h-1">
        <img
          className="object-cover rounded-l-md"
          alt="anime-img"
          src={anime?.coverImage?.large || undefined}
        />
        <a href={`https://anilist.co/anime/${anime.id}/`} rel="noreferrer" target="_blank">
          {/*Card Studio & Title */}
          <div className="absolute inset-x-0 bottom-0 bg-accent-gray-darkest bg-opacity-90 w-full py-2 px-2 rounded-bl-md studio">
            <h1 className="text-white font-bold text-left text-sm">{getName()}</h1>
            {anime?.studios?.edges && anime.studios.edges[0] ? (
              <p
                style={{
                  color: `${anime?.coverImage?.color}`,
                }}
                className="text-left font-bold text-xs"
              >
                {anime?.studios?.edges[0]?.node?.name}
              </p>
            ) : (
              <p className="text-left font-bold text-xs">TBA</p>
            )}
          </div>
        </a>
      </div>
      {/* Card Desc */}
      <div className="w-full md:max-w-full flex flex-col justify-between">
        <div className="mx-3 mt-3 mb-2 overflow-auto">
          {cardTitle({
            anime: props.anime,
          })}
          <p className="text-left text-xs">Source • {anime.source}</p>
          <p
            dangerouslySetInnerHTML={createMarkup()}
            className="text-left text-xs mt-3 text-gray-400 hover:text-gray-300"
            id="ep-desc"
          ></p>
        </div>
        <div className="bg-accent-gray-darker text-black py-2 rounded-br-md">
          {anime?.genres?.slice(0, 2).map((genre) => (
            <span
              key={genre}
              style={{
                backgroundColor: `${getColor()}`,
              }}
              className="px-3 py-1 text-xs font-bold w-full mx-1 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;

import { FragmentType, useFragment } from "../../gql/fragment-masking";
import { MediaFieldsFragment } from "../../queries/fragments/MediaFields";

import { cardTitle } from "../../utils/card-title";

import "./HorizontalCard.styles.css";

function HorizontalCard(props: { anime: FragmentType<typeof MediaFieldsFragment> }) {
  const anime = useFragment(MediaFieldsFragment, props.anime);

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
    <div className="hover:scale-101 elementToFadeInAndOut flex h-60 w-auto transform overflow-hidden rounded-md bg-accent-gray-darkest text-gray-300 transition duration-300 ease-in-out hover:shadow-2xl md:h-64">
      {/* Card Image */}
      <div className="aspect-w-16 aspect-h-1 relative w-64">
        <img
          className="rounded-l-md object-cover"
          alt="anime-img"
          src={anime?.coverImage?.large || undefined}
        />
        <a href={`https://anilist.co/anime/${anime.id}/`} rel="noreferrer" target="_blank">
          {/*Card Studio & Title */}
          <div className="studio absolute inset-x-0 bottom-0 w-full rounded-bl-md bg-accent-gray-darkest bg-opacity-90 py-2 px-2">
            <h1 className="text-left text-sm font-bold text-white">{getName()}</h1>
            {anime?.studios?.edges && anime.studios.edges[0] ? (
              <p
                style={{
                  color: `${anime?.coverImage?.color}`,
                }}
                className="text-left text-xs font-bold"
              >
                {anime?.studios?.edges[0]?.node?.name}
              </p>
            ) : (
              <p className="text-left text-xs font-bold">TBA</p>
            )}
          </div>
        </a>
      </div>
      {/* Card Desc */}
      <div className="flex w-full flex-col justify-between md:max-w-full">
        <div className="mx-3 mt-3 mb-2 overflow-auto">
          {cardTitle({
            anime: props.anime,
          })}
          <p className="text-left text-xs">Source • {anime.source}</p>
          <p
            dangerouslySetInnerHTML={createMarkup()}
            className="mt-3 text-left text-xs text-gray-400 hover:text-gray-300"
            id="ep-desc"
          ></p>
        </div>
        <div className="rounded-br-md bg-accent-gray-darker py-2 text-black">
          {anime?.genres?.slice(0, 2).map((genre) => (
            <span
              key={genre}
              style={{
                backgroundColor: `${getColor()}`,
              }}
              className="mx-1 w-full rounded-full px-3 py-1 text-xs font-bold"
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

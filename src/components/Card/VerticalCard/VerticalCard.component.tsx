import { FragmentType, useFragment } from "../../../gql";
import { MediaCardFragment } from "../../../queries/getTrendingAnime";

const VerticalCard = (props: { media: FragmentType<typeof MediaCardFragment> }) => {
  const media = useFragment(MediaCardFragment, props.media);
  return (
    <div>
      <div className="aspect-w-3 aspect-h-4 drop-shadow-xl">
        <img src={media?.coverImage?.large || ""} alt="" className="rounded-md object-cover" />
      </div>

      <div className="mt-2">
        <p
          className="text-xs font-semibold text-gray-500 line-clamp-2 md:text-sm"
          title={media?.title?.english || media?.title?.romaji || ""}
        >
          {media?.title?.english || media?.title?.romaji}
        </p>
      </div>
    </div>
  );
};

export default VerticalCard;

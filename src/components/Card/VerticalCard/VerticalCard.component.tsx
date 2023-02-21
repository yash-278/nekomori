import { FragmentType, useFragment } from "../../../gql";
import { MediaCardFragment } from "../../../queries/getTrendingAnime";

const VerticalCard = (props: { media: FragmentType<typeof MediaCardFragment> }) => {
  const media = useFragment(MediaCardFragment, props.media);
  return (
    <div className="">
      <div className="aspect-w-3 aspect-h-4 drop-shadow-xl">
        <img src={media?.coverImage?.large || ""} alt="" className="rounded-md" />
      </div>

      <div className="mt-2">
        <p className="truncate text-xs font-semibold text-gray-500 md:text-sm">
          {media?.title?.english}
        </p>
      </div>
    </div>
  );
};

export default VerticalCard;

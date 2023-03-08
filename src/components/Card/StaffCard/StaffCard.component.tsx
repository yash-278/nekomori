import { Link } from "react-router-dom";
import { FragmentType, graphql, useFragment } from "../../../gql";
import ImageLoader from "../../ImageLoader/ImageLoader.component";

const StaffCard = (props: { staff: FragmentType<typeof StaffCardFragment> }) => {
  const staff = useFragment(StaffCardFragment, props.staff);

  console.warn(staff);

  return (
    <Link to={staff?.siteUrl || ""} key={staff?.id}>
      <div className="aspect-w-3 aspect-h-4">
        <ImageLoader src={staff?.image?.large || ""} />
      </div>

      <div className="mt-2">
        <p
          className="text-xs font-semibold text-gray-500 line-clamp-2 md:text-sm"
          title={staff?.name?.userPreferred || staff?.name?.full || ""}
        >
          {staff?.name?.userPreferred || staff?.name?.full || ""}
        </p>
      </div>
    </Link>
  );
};

export const StaffCardFragment = graphql(/* GraphQL */ `
  fragment StaffItem on Staff {
    id
    image {
      large
      medium
    }
    primaryOccupations
    gender
    dateOfBirth {
      year
      month
      day
    }
    dateOfDeath {
      year
      month
      day
    }
    yearsActive
    age
    siteUrl
    name {
      first
      middle
      last
      full
      native
      userPreferred
    }
  }
`);

export default StaffCard;

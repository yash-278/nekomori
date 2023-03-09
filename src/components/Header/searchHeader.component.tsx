import { setSeason, setYear } from "../../store/reducer/season/season.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/customRedux";
import MyListbox from "../Listbox/listbox.component";
import { MediaSeason } from "../../gql/graphql";
import HeaderLogo from "./headerLogo.component";
import { getYears } from "../../utils/season";

const SearchHeader = () => {
  const dispatch = useAppDispatch();
  const { currentSeason, currentYear } = useAppSelector((state) => state.season);
  const years = getYears();
  return (
    <div className="flex h-16 items-center justify-between bg-accent-gray-darkest py-3 px-4 text-gray-500 lg:py-5 lg:px-12">
      <HeaderLogo />
      <div className="hidden space-x-10 text-center font-semibold lg:flex">
        <div
          className={`text-sm ${
            currentSeason === "WINTER" ? "isActive" : "notActive"
          } cursor-pointer`}
          onClick={() => {
            dispatch(setSeason(MediaSeason.Winter));
          }}
        >
          WINTER <br /> {currentYear}
        </div>
        <div
          className={`text-sm ${
            currentSeason === "SPRING" ? "isActive" : "notActive"
          } cursor-pointer`}
          onClick={() => {
            dispatch(setSeason(MediaSeason.Spring));
          }}
        >
          SPRING <br /> {currentYear}
        </div>
        <div
          className={`text-sm ${
            currentSeason === "SUMMER" ? "isActive" : "notActive"
          } cursor-pointer`}
          onClick={() => {
            dispatch(setSeason(MediaSeason.Summer));
          }}
        >
          SUMMER <br /> {currentYear}
        </div>
        <div
          className={`text-sm ${
            currentSeason === "FALL" ? "isActive" : "notActive"
          } cursor-pointer`}
          onClick={() => {
            dispatch(setSeason(MediaSeason.Fall));
          }}
        >
          FALL <br /> {currentYear}
        </div>
      </div>

      <div className="flex">
        <MyListbox
          rangeOfValues={years}
          defaultValue={years[years.length - 2]}
          setterFunction={(value: string) => dispatch(setYear(value))}
        />
      </div>
    </div>
  );
};

export default SearchHeader;

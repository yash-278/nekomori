import "./header.styles.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/customRedux";
import { setSeason, setStatus, setYear } from "../../store/reducer/season/season.slice";
import MyListbox from "../Listbox/listbox.component";
import { MediaSeason } from "../../gql/graphql";

const years = Array.from({ length: new Date().getFullYear() + 1 - 2000 + 1 }, (_, index) =>
  (2000 + index).toString()
);

function Header() {
  const { currentSeason, currentYear } = useAppSelector((state) => state.season);

  const dispatch = useAppDispatch();

  return (
    <div className="flex h-16 text-gray-500 bg-accent-gray-darkest justify-between items-center py-3 lg:py-5 px-4 lg:px-12">
      <div>
        <Link
          to="/"
          onClick={() => {
            dispatch(setSeason(MediaSeason.Winter));
          }}
          className="text-2xl text-gray-100 font-bold cursor-pointer no-underline hover:text-gray-200 navbar-brand"
        >
          Nekomori
        </Link>
      </div>
      <div className="hidden lg:flex text-center space-x-10 font-semibold">
        <Link
          to="/"
          className={`text-sm ${
            currentSeason === "WINTER" ? "isActive" : "notActive"
          } cursor-pointer`}
          onClick={() => {
            dispatch(setSeason(MediaSeason.Winter));
          }}
        >
          WINTER <br /> {currentYear}
        </Link>
        <Link
          to="/"
          className={`text-sm ${
            currentSeason === "SPRING" ? "isActive" : "notActive"
          } cursor-pointer`}
          onClick={() => {
            dispatch(setSeason(MediaSeason.Spring));
          }}
        >
          SPRING <br /> {currentYear}
        </Link>
        <Link
          to="/"
          className={`text-sm ${
            currentSeason === "SUMMER" ? "isActive" : "notActive"
          } cursor-pointer`}
          onClick={() => {
            dispatch(setSeason(MediaSeason.Summer));
          }}
        >
          SUMMER <br /> {currentYear}
        </Link>
        <Link
          to="/"
          className={`text-sm ${
            currentSeason === "FALL" ? "isActive" : "notActive"
          } cursor-pointer`}
          onClick={() => {
            dispatch(setSeason(MediaSeason.Fall));
          }}
        >
          FALL <br /> {currentYear}
        </Link>
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
}

export default Header;

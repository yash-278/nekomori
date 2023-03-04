import { Link, useLocation } from "react-router-dom";
import "./header.styles.css";
import HeaderLogo from "./headerLogo.component";
import SearchHeader from "./searchHeader.component";
import { FaSearch } from "react-icons/fa";
import { BsFillCalendarWeekFill } from "react-icons/bs";

function Header() {
  const pathName = useLocation().pathname;

  if (pathName === "/schedule") return <SearchHeader />;

  return (
    <div className="flex h-16 items-center justify-between bg-accent-gray-darkest py-3 px-4 text-gray-500 lg:py-5 lg:px-12">
      <HeaderLogo />
      <div className="hidden space-x-10 text-center font-semibold lg:flex">
        <Link to="/activity" className={`${pathName === "/activity" ? "isActive" : "notActive"}`}>
          Home
        </Link>
        <Link to="/anime" className={`${pathName === "/anime" ? "isActive" : "notActive"}`}>
          Anime List
        </Link>
        <Link to="/manga" className={`${pathName === "/manga" ? "isActive" : "notActive"}`}>
          Manga List
        </Link>
        <Link to="/schedule" className={`${pathName === "/schedule" ? "isActive" : "notActive"}`}>
          Browse
        </Link>
        <Link to="/profile" className={`${pathName === "/profile" ? "isActive" : "notActive"}`}>
          Profile
        </Link>
      </div>

      <div className="flex space-x-5">
        <Link to="/search">
          <FaSearch size="1.2em" />
        </Link>

        <Link to="/schedule">
          <BsFillCalendarWeekFill size="1.2em" />
        </Link>
      </div>
    </div>
  );
}

export default Header;

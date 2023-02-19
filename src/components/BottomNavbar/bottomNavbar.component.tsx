import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./bottom-navbar.styles.css";
import { useAppDispatch, useAppSelector } from "../../hooks/customRedux";
import { setSeason } from "../../store/reducer/season/season.slice";
import { IoIosSunny, IoMdSnow, IoIosLeaf } from "react-icons/io";
import { GiHamburgerMenu, GiTreeBranch } from "react-icons/gi";
import { MediaSeason } from "../../gql/graphql";

export default function BottomNavbar() {
  const { currentSeason, currentYear } = useAppSelector((state) => state.season);

  const dispatch = useAppDispatch();

  const [navState, setNavState] = useState(true);

  const navStateChange = () => {
    setNavState((current) => !current);
  };

  return (
    <div className="lg:invisible fixed w-full bottom-0 text-white">
      <div className="shadow-2xl flex">
        <nav className="mx-2 my-2 py-2 bg-gray-800 rounded flex-1 navi-left z-10">
          <ul className="flex justify-evenly text-center">
            <li>
              <Link
                onClick={() => {
                  dispatch(setSeason(MediaSeason.Winter));
                }}
                to="/"
                className={`flex flex-col items-center ${
                  currentSeason === "WINTER" ? "isActive" : "notActive"
                }`}
              >
                <IoMdSnow />
                <span className="text-xs">Winter</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  dispatch(setSeason(MediaSeason.Spring));
                }}
                to="/"
                className={`flex flex-col items-center ${
                  currentSeason === "SPRING" ? "isActive" : "notActive"
                }`}
              >
                <GiTreeBranch />
                <span className="text-xs">Spring</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  dispatch(setSeason(MediaSeason.Summer));
                }}
                to="/"
                className={`flex flex-col items-center ${
                  currentSeason === "SUMMER" ? "isActive" : "notActive"
                }`}
              >
                <IoIosSunny />
                <span className="text-xs">Summer</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  dispatch(setSeason(MediaSeason.Fall));
                }}
                to="/"
                className={`flex flex-col items-center ${
                  currentSeason === "FALL" ? "isActive" : "notActive"
                }`}
              >
                <IoIosLeaf />
                <span className="text-xs">Fall</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className="mr-2.5 my-2 px-3 text-white bg-gray-800 rounded navi z-0"
          onClick={() => navStateChange()}
        >
          <button className="h-full flex items-center">
            <GiHamburgerMenu size={"1.2em"} />
          </button>
        </div>
      </div>
    </div>
  );
}

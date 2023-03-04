import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./bottom-navbar.styles.css";
import { useAppDispatch, useAppSelector } from "../../hooks/customRedux";
import { setSeason } from "../../store/reducer/season/season.slice";
import { IoIosSunny, IoMdSnow, IoIosLeaf } from "react-icons/io";
import { FiActivity, FiUser } from "react-icons/fi";
import { GiHamburgerMenu, GiTreeBranch, GiBlackBook, GiFilmStrip } from "react-icons/gi";
import { MediaSeason } from "../../gql/graphql";

export default function BottomNavbar() {
  const location = useLocation().pathname;
  const dispatch = useAppDispatch();

  const { currentSeason, currentYear } = useAppSelector((state) => state.season);

  const [navState, setNavState] = useState(true);

  const navStateChange = () => {
    setNavState((current) => !current);
  };

  if (location === "/schedule")
    return (
      <div className="fixed bottom-0 w-full text-white lg:invisible">
        <div className="flex shadow-2xl">
          <nav className="navi-left z-10 mx-2 my-2 flex-1 rounded bg-accent-gray-darkest py-2">
            <ul className="flex justify-evenly text-center">
              <li>
                <div
                  onClick={() => {
                    dispatch(setSeason(MediaSeason.Winter));
                  }}
                  className={`flex flex-col items-center ${
                    currentSeason === "WINTER" ? "isActive" : "notActive"
                  }`}
                >
                  <IoMdSnow />
                  <span className="text-xs">Winter</span>
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    dispatch(setSeason(MediaSeason.Spring));
                  }}
                  className={`flex flex-col items-center ${
                    currentSeason === "SPRING" ? "isActive" : "notActive"
                  }`}
                >
                  <GiTreeBranch />
                  <span className="text-xs">Spring</span>
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    dispatch(setSeason(MediaSeason.Summer));
                  }}
                  className={`flex flex-col items-center ${
                    currentSeason === "SUMMER" ? "isActive" : "notActive"
                  }`}
                >
                  <IoIosSunny />
                  <span className="text-xs">Summer</span>
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    dispatch(setSeason(MediaSeason.Fall));
                  }}
                  className={`flex flex-col items-center ${
                    currentSeason === "FALL" ? "isActive" : "notActive"
                  }`}
                >
                  <IoIosLeaf />
                  <span className="text-xs">Fall</span>
                </div>
              </li>
            </ul>
          </nav>
          <div
            className="navi z-0 my-2 mr-2.5 rounded bg-accent-gray-darkest px-3 text-white"
            onClick={() => navStateChange()}
          >
            <button className="flex h-full items-center">
              <GiHamburgerMenu size={"1.2em"} />
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="fixed bottom-0 flex w-full text-white shadow-2xl lg:invisible">
      <nav className="navi-left z-10 mx-2 my-2 flex-1 rounded bg-accent-gray-darkest py-2">
        <ul className="flex justify-evenly text-center">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "isActive" : "notActive")}>
              <FiActivity className="h-full" size="1.5em" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/anime"
              className={({ isActive }) => (isActive ? "isActive" : "notActive")}
            >
              <GiFilmStrip className="h-full" size="1.5em" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manga"
              className={({ isActive }) => (isActive ? "isActive" : "notActive")}
            >
              <GiBlackBook className="h-full" size="1.5em" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "isActive" : "notActive")}
            >
              <FiUser className="h-full" size="1.5em" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  changeSeasonToWinter,
  changeSeasonToSpring,
  changeSeasonToSummer,
  changeSeasonToFall,
  changeSeasonToTBA,
  changeSeasonToAiring,
  changeToReviews,
} from "../../actions";

import "./bottom-navbar.styles.scss";

export default function BottomNavbar() {
  const season = useSelector((state) => state.navbar.season);
  const status = useSelector((state) => state.navbar.status);

  const dispatch = useDispatch();

  const [navState, setNavState] = useState(true);

  const navStateChange = () => {
    setNavState((current) => !current);
  };

  return (
    <div className="lg:invisible fixed w-full bottom-0 text-white">
      <div className="shadow-2xl flex">
        {navState ? (
          <nav className="mx-2.5 my-2 py-2 bg-gray-800 rounded flex-1 navi-left z-10">
            <ul className="flex justify-evenly">
              <li>
                <Link
                  onClick={() => {
                    dispatch(changeSeasonToWinter());
                  }}
                  to="/"
                  className={`flex flex-col ${season === "WINTER" ? "isActive" : "notActive"}`}
                >
                  <i className="bi bi-snow2 text-lg"></i>
                  <span className="text-xs">Winter</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    dispatch(changeSeasonToSpring());
                  }}
                  to="/"
                  className={`flex flex-col ${season === "SPRING" ? "isActive" : "notActive"}`}
                >
                  <i className="bi bi-tree-fill text-lg"></i>
                  <span className="text-xs">Spring</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    dispatch(changeSeasonToSummer());
                  }}
                  to="/"
                  className={`flex flex-col ${season === "SUMMER" ? "isActive" : "notActive"}`}
                >
                  <i className="bi bi-brightness-high-fill text-lg"></i>
                  <span className="text-xs">Summer</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    dispatch(changeSeasonToFall());
                  }}
                  to="/"
                  className={`flex flex-col ${season === "FALL" ? "isActive" : "notActive"}`}
                >
                  <i className="bi bi-thermometer-low text-lg"></i>
                  <span className="text-xs">Fall</span>
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="mx-2.5 my-2 py-2 bg-gray-800 rounded flex-1 navi-left z-10">
            <ul className="flex justify-evenly">
              <li>
                <Link
                  onClick={() => {
                    dispatch(changeSeasonToTBA());
                  }}
                  to="/"
                  className={`flex flex-col ${
                    status === "NOT_YET_RELEASED" ? "isActive" : "notActive"
                  }`}
                >
                  <i className="bi bi-clock-fill text-lg"></i>
                  <span className="text-xs">TBA</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    dispatch(changeSeasonToAiring());
                  }}
                  to="/"
                  className={`flex flex-col ${status === "RELEASING" ? "isActive" : "notActive"}`}
                >
                  <i className="bi bi-calendar text-lg"></i>
                  <span className="text-xs">Airing</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  dispatch(changeToReviews());
                }}
              >
                <Link
                  to="/reviews"
                  className={`flex flex-col ${season === "REVIEWS" ? "isActive" : "notActive"}`}
                >
                  <i className="bi bi-newspaper text-lg"></i>
                  <span className="text-xs">Reviews</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <div
          className="mr-2.5 my-2 pt-1.5 px-2 text-white flex-none bg-gray-800 rounded navi z-0"
          onClick={() => navStateChange()}
        >
          <button className="h-full flex items-center">
            <i className="bi bi-chevron-left"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

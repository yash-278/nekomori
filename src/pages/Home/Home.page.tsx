import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar/bottomNavbar.component";
import Header from "../../components/Header/header.component";
import { FragmentType, useFragment } from "../../gql";
import { useAppDispatch, useAppSelector } from "../../hooks/customRedux";
import { getAnime, MediaFragment } from "../../queries/getAnime";
import { anilistClient } from "../../queries/graphqlClient";
import { setSeason } from "../../store/reducer/season/season.slice";

const Home = () => {
  return (
    <div className="App bg-accent-gray-black min-h-screen text-white">
      <Header />
      <div>
        <Outlet />
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Home;

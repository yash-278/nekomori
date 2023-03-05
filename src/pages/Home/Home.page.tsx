import { Outlet } from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar/bottomNavbar.component";
import Header from "../../components/Header/header.component";

const Home = () => {
  return (
    <div className="App min-h-screen bg-accent-gray-black text-white">
      <Header />
      <div>
        <Outlet />
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Home;

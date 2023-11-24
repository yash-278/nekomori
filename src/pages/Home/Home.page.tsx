import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar/bottomNavbar.component";
import Header from "../../components/Header/header.component";

const Home = () => {
  // console.warn(location);

  return (
    <motion.div
      className="App min-h-screen bg-accent-gray-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 1 } } }}
      key="home-page"
    >
      <Header />

      <Outlet />

      <BottomNavbar />
    </motion.div>
  );
};

export default Home;

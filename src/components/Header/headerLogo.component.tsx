import { Link, useLocation } from "react-router-dom";

const HeaderLogo = () => {
  const pathname = useLocation().pathname;
  const locationAndTitle = [
    { path: "/schedule", title: "Schedule" },
    { path: "/anime", title: "Anime" },
    { path: "/manga", title: "Manga" },
    { path: "/profile", title: "Profile" },
    // Add more titles as needed
  ];

  const title = locationAndTitle.find((t) => t.path === pathname)?.title || "Nekomori";

  return <div className="navbar-brand text-2xl font-bold text-gray-100 no-underline ">{title}</div>;
};

export default HeaderLogo;

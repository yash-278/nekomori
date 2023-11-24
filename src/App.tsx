import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Activity from "./pages/Activity/Activity.Page";
import Anime from "./pages/Anime/Anime.page";
import Schedule from "./pages/Schedule/Schedule.page";
import Home from "./pages/Home/Home.page";
import Manga from "./pages/Manga/Manga.page";
import Profile from "./pages/Profile/Profile.page";
import Search from "./pages/Search/Search.page";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { store } from "./store/store/store";
import { AnimatePresence } from "framer-motion";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <>
      {/* Provide the client to your App */}
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AnimatePresence mode="wait">
            <RouterProvider router={router} />
          </AnimatePresence>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home key={location.pathname} />,
    children: [
      {
        path: "/",
        element: <Activity key={location.pathname} />,
      },
      {
        path: "/schedule",
        element: <Schedule key={location.pathname} />,
      },
      {
        path: "/anime",
        element: <Anime key={location.pathname} />,
      },
      {
        path: "/manga",
        element: <Manga key={location.pathname} />,
      },
      {
        path: "/profile",
        element: <Profile key={location.pathname} />,
      },
    ],
  },
  {
    path: "/search",
    element: <Search key="/search" />,
  },
]);

export default App;

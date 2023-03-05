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
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Activity />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/anime",
        element: <Anime />,
      },
      {
        path: "/manga",
        element: <Manga />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/search",
    element: <Search />,
  },
]);

export default App;

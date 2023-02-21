import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Browse from "./pages/Browse/Browse.page";
import Home from "./pages/Home/Home.page";
import Search from "./pages/Search/Search.page";

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
        element: <Browse />,
      },
    ],
  },
  {
    path: "/search",
    element: <Search />,
  },
]);

export default App;

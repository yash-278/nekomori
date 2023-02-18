import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home.page";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default App;

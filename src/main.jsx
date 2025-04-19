import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // Now only Hero
import CreateTrip from "./create-trip/index.jsx";
import Layout from "./components/Layout.jsx"; // or ./layouts/Layout.jsx

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "", // root path
        element: <App />,
      },
      {
        path: "create-trip",
        element: <CreateTrip />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

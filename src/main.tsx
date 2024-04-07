import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LandingPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import React from "react";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage />, errorElement: <ErrorPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

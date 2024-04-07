import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import UserItemViewPage from "./pages/UserItemViewPage";
import DashboardUsers from "./pages/DashboardUsers";
import DashboardProducts from "./pages/DashboardProducts";
import DashboardBlacklist from "./pages/DashboardBlacklist";
import SettingsPage from "./pages/SettingsPage";
import "./styles/main.scss";
import React from "react";
import SetPasswordPage from "./pages/SetPasswordPage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage />, errorElement: <ErrorPage /> },
  { path: "about", element: <AboutPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "setpassword", element: <SetPasswordPage /> },
  { path: "blacklist", element: <UserItemViewPage /> },
  {
    path: "dashboard",
    children: [
      { path: "users", element: <DashboardUsers /> },
      { path: "products", element: <DashboardProducts /> },
      { path: "blacklist", element: <DashboardBlacklist /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

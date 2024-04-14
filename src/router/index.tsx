import DashboardBlacklist from "../pages/DashboardBlacklist";
import DashboardProducts from "../pages/DashboardProducts";
import UserItemViewPage from "../pages/UserItemViewPage";
import { createBrowserRouter } from "react-router-dom";
import SetPasswordPage from "../pages/SetPasswordPage";
import DashboardUsers from "../pages/DashboardUsers";
import SettingsPage from "../pages/SettingsPage";
import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import PrivateRouter from "./privateRouter";
import SelectOption from "../pages/SelectOption";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage />, errorElement: <ErrorPage /> },
  { path: "about", element: <AboutPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "select", element: <SelectOption /> },
  { path: "setpassword", element: <SetPasswordPage /> },
  { path: "blacklist", element: <UserItemViewPage /> },
  {
    path: "dashboard",
    children: [
      {
        path: "users",
        element: (
          <PrivateRouter>
            <DashboardUsers />
          </PrivateRouter>
        ),
      },
      {
        path: "products",
        element: (
          <PrivateRouter>
            <DashboardProducts />
          </PrivateRouter>
        ),
      },
      {
        path: "blacklist",
        element: (
          <PrivateRouter>
            <DashboardBlacklist />
          </PrivateRouter>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRouter>
            <SettingsPage />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

import { MemoizedBlacklist } from "../pages/DashboardBlacklist";
import { MemoizedProduct } from "../pages/DashboardProducts";
import { MemoizedUserItemView } from "../pages/UserItemViewPage";
import { createBrowserRouter } from "react-router-dom";
import SetPasswordPage from "../pages/SetPasswordPage";
import { MemoizedUser } from "../pages/DashboardUsers";
import SelectOption from "../pages/SelectOption";
import SettingsPage from "../pages/SettingsPage";
import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import PrivateRouter from "./privateRouter";
import { MemoizedSearch } from "../pages/SearchPage";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage />, errorElement: <ErrorPage /> },
  { path: "about", element: <AboutPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "select", element: <SelectOption /> },
  { path: "setpassword", element: <SetPasswordPage /> },
  { path: "blacklist", element: <MemoizedUserItemView /> },
  { path: "blacklist/search", element: <MemoizedSearch /> },
  {
    path: "dashboard",
    children: [
      {
        path: "users",
        element: (
          <PrivateRouter>
            <MemoizedUser />
          </PrivateRouter>
        ),
      },
      {
        path: "products",
        element: (
          <PrivateRouter>
            <MemoizedProduct />
          </PrivateRouter>
        ),
      },
      {
        path: "blacklist",
        element: (
          <PrivateRouter>
            <MemoizedBlacklist />
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

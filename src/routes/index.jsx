import {
  Link,
  Navigate,
  Outlet,
  Route,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import {
  DEFAULT_PATH,
  FRIENDS_PATH,
  HISTORY_PATH,
  SETTINGS_PATH,
  SETUP_INFO_PATH,
} from "../config";
import Page404 from "../pages/public/Page404";
import { ProtectRoute, ProtectRouteAdminDashboard } from "./ProtectRoute";

// Layout
import DashBoardLayout from "../layouts/dashboard";
import ChatLayout from "../layouts/chat";
import SettingsLayout from "../layouts/settings";

// page
import Details from "../components/settings/Details";
import Authenticate from "../pages/public/Authenticate";
import SetupInfoPage from "../pages/private/SetupInfos";

// Inner page
import Privacy from "../components/settings/Privacy";
import Security from "../components/settings/Security";
import Wallpaper from "../components/settings/Wallpaper";
import Notification from "../components/settings/Notification";
import Devices from "../components/settings/Devices";

import ChatRoom from "../components/Chat/ChatRoom";
import ChatSelect from "../components/Chat/ChatSelect";

import { useSelector } from "react-redux";
import SetupInfo from "../pages/private/SetupInfo";
import { ModalTypes, TypeUsers } from "../constants";
import { useModal } from "../hooks/useModal";
import { useEffect } from "react";
export default function Router() {
  const { isSignedIn, type } = useSelector((state) => state.auth);
  const navigation = useNavigate();
  const navigate = type === TypeUsers.NEW_USER ? SETUP_INFO_PATH : DEFAULT_PATH;
  const { onOpen } = useModal();
  useEffect(() => {
    if (window.location.pathname === SETUP_INFO_PATH) {
      onOpen(ModalTypes.setupProfile);
    }
  }, [window.location.pathname]);
  return useRoutes([
    {
      path: "/",
      element: <DashBoardLayout />,
      children: [
        // root path = "/"

        // main app
        {
          element: <Navigate to={navigate} replace />,
          index: true,
        },

        // chat
        {
          path: "app",
          children: [
            {
              path: "chat",
              element: (
                <ProtectRoute isSignedIn={isSignedIn}>
                  <ChatLayout />
                </ProtectRoute>
              ),
              children: [
                { path: "", element: <ChatSelect /> },
                { path: ":chatId", element: <ChatRoom /> },
              ],
            },
            {
              path: SETTINGS_PATH,
              element: (
                <ProtectRoute isSignedIn={isSignedIn} type={type}>
                  <SettingsLayout />
                </ProtectRoute>
              ),
              children: [
                {
                  path: "",
                  element: <Details />,
                },
                {
                  path: "privacy",
                  element: <Privacy />,
                },
                {
                  path: "security",
                  element: <Security />,
                },
                {
                  path: "devices",
                  element: <Devices />,
                },
                {
                  path: "notification",
                  element: <Notification />,
                },
                {
                  path: "wallpaper",
                  element: <Wallpaper />,
                },
              ],
            },
            {
              path: HISTORY_PATH,
              element: (
                <ProtectRoute isSignedIn={isSignedIn} type={type}>
                  <div>Chat History</div>
                </ProtectRoute>
              ),
            },
            {
              path: FRIENDS_PATH,
              element: (
                <ProtectRoute isSignedIn={isSignedIn}>
                  <div>List Friend</div>
                </ProtectRoute>
              ),
            },
          ],
        },

        // authenticate
        {
          path: "auth",
          element: (
            <ProtectRoute isSignedIn={!isSignedIn} redirect="/">
              <Authenticate />
            </ProtectRoute>
          ),
        },

        // Setup - Info
        {
          path: SETUP_INFO_PATH,
          element: (
            <ProtectRoute isSignedIn={isSignedIn} redirect="/">
              {/* {onOpen(ModalTypes.setupProfile)} */}
              <div></div>
            </ProtectRoute>
          ),
        },

        // Admin - Panel
        {
          path: "admin-panel",
          element: (
            <ProtectRoute isSignedIn={isSignedIn} redirect="/">
              <ProtectRouteAdminDashboard active={false}>
                <div className="flex">
                  <div className="h-screen w-[200px] bg-slate-300">
                    Navbar Admin:
                  </div>{" "}
                  <Outlet />
                </div>
              </ProtectRouteAdminDashboard>
            </ProtectRoute>
          ),
          children: [
            { path: "", element: <>manage message</> },
            { path: "settings", element: <>Settings Admin (Change Key)</> },
          ],
        },
        { path: "*", element: <Page404 /> },
      ],
    },
    { path: "*", element: <Page404 /> },
  ]);
}

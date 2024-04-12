import { Navigate, Outlet } from "react-router-dom";
import { SETUP_INFO_PATH } from "../config";
import { useSelector } from "react-redux";
import { TypeUsers } from "../constants";

const ProtectRoute = ({ children, isSignedIn, redirect = "/auth" }) => {
  const { type } = useSelector((state) => state.auth);
  if (!isSignedIn) {
    return <Navigate to={redirect} />;
  }
  if (type === TypeUsers.NEW_USER && isSignedIn) {
    return children;
  }
  return children ? children : <Outlet />;
};

const ProtectRouteAdminDashboard = ({ active, redirect = "/", children }) => {
  if (!active) {
    return <Navigate to={redirect} />;
  }
  return children ? children : <Outlet />;
};
export { ProtectRoute, ProtectRouteAdminDashboard };

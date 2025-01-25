import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ProtectRoutes = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  // Redirect to login if not authenticated
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // Render nested routes
  return <Outlet />;
};

export default ProtectRoutes;
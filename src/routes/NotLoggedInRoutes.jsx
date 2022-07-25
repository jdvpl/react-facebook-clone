import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const NotLoggedInRoutes = () => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default NotLoggedInRoutes;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.authSlice);

  return isLoggedIn ? children : <Navigate to="../auth" />;
};

export default PrivateRoute;

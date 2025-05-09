import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(UserContext); 

  return isLoggedIn ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
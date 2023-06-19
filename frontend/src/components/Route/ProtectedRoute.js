import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin = false, component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // return isAuthenticated ? component : <Navigate to="/login" replace={true} />;
  if (isAuthenticated === false) {
    navigate("/login");
    return null;
  } else {
    if (isAdmin === true && user.role !== "admin") {
      navigate("/account");
      return null;
    }
  }

  return component;
};

export default ProtectedRoute;

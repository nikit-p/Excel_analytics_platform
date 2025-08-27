import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const jwtToken = localStorage.getItem("jwtToken");

  return jwtToken ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

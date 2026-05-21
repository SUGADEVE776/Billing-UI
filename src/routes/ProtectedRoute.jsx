import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("access_token");

  // if token not found
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // allow access
  return children;
}

export default ProtectedRoute;
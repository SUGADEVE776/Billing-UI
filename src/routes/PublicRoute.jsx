import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {

  const token = localStorage.getItem("access_token");

  // already logged in
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PublicRoute;
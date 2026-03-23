import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);

  // If user is NOT logged in → redirect
    if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    }

  // Otherwise show the page
    return children;
}

export default ProtectedRoute;

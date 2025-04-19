import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (!user?.role) {
    return <Navigate to="/login" />;
  }

  return children;
};
export default PrivateRoute;

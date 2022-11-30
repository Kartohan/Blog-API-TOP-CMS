import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ isExpired }) => {
  return !isExpired ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

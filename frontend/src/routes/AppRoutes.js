import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import AdminDashboard from "../pages/AdminDashboard";
import ManagerDashboard from "../pages/ManagerDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";

const PrivateRoute = ({ element, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/signin" />;
  if (role && userRole !== role) return <Navigate to="/signin" />;

  return element;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element= {<Navigate to = "/signin "/> } />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} role="admin" />} />
      <Route path="/manager-dashboard" element={<PrivateRoute element={<ManagerDashboard />} role="manager" />} />
      <Route path="/employee-dashboard" element={<PrivateRoute element={<EmployeeDashboard />} role="employee" />} />
    </Routes>
  );
}

export default AppRoutes;

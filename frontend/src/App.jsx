import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";
import User from "./pages/User";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Employee from "./pages/Employee";
import PublicRoute from "./pages/components/PublicRoute";
import PrivateRoute from "./pages/components/PrivateRoute";
import VerificationResult from "./pages/VerificationResult";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <PrivateRoute>
                <Employee />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              // <PublicRoute>
                <Login />
              // </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              // <PublicRoute>
                <Signup />
              // </PublicRoute>
            }
          />
          <Route path="/verify" element={<VerificationResult/>} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

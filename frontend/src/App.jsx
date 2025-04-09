import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";
import User from "./pages/User";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <ThemeProvider> 
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<User/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Signup/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SystemsPage from "./pages/SystemsPage";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const name = localStorage.getItem("name");
    if (isAuthenticated && isAuthenticated === "true" && name) {
      setAuthenticated(true);
      setName(name);
    }
  }, []);

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("");
  console.log("isAuthenticated", isAuthenticated);

  const handleLogin = (res) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("name", res.data.name);
    setAuthenticated(true);
    setName(res.data.name);
    navigate("/system");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("name");
    setAuthenticated(false);
  };

  return (
    <div className="container">
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/system" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/system"
          element={
            isAuthenticated ? (
              <SystemsPage handleLogout={handleLogout} name={name} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};
export default App;

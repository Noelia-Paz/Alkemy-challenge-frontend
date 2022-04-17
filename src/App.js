import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import DetallesBlog from "./components/DetallesBlog/DetallesBlog";
import EditarBlog from "./components/EditarBlog/EditarBlog";
import InsertarBlog from "./components/InsertarBlog/InsertarBlog";
import Header from "./components/Header/Header";
import LoginUser from "./components/LoginUser/LoginUser";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("isAdmin")));
  }, [admin]);

  return (
    <>
      <Router>
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route
                path="/"
                element={<Home isAuthenticated={isAuthenticated} />}
              />
              <Route path="/insertar" element={<InsertarBlog />} />
              <Route
                path="/detalles"
                element={<DetallesBlog isAuthenticated={isAuthenticated} />}
              />
              <Route path="/editar" element={<EditarBlog />} />
            </>
          ) : (
            <>
              <Route path="/detalles" element={<DetallesBlog />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/loginUser"
                element={<LoginUser setAdmin={setAdmin} admin={admin} />}
              />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;

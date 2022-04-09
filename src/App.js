import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

//componentes
import Home from "./components/Home/Home";
import DetallesBlog from "./components/DetallesBlog/DetallesBlog";
import EditarBlog from "./components/EditarBlog/EditarBlog";
import InsertarBlog from "./components/InsertarBlog/InsertarBlog";
import Header from "./components/Header/Header";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Header />
      <Router>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/insertar" element={<InsertarBlog />} />
              <Route path="/detalles" element={<DetallesBlog />} />
              <Route path="/editar" element={<EditarBlog />} />
            </>
          ) : (
            <>
              <Route path="/detalles" element={<DetallesBlog />} />
              <Route path="/" element={<Home />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;

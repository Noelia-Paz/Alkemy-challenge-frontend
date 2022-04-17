import React from "react";
import "./logout.css";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("isAdmin", "false");
    props.setIsAuthenticated(!props.isAuthenticated);
    navigate("/");
  };

  return (
    <button className="Boton-salir" onClick={logout}>
      Cerrar Sesion
    </button>
  );
}

export default Logout;

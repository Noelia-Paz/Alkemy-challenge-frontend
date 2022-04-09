import React from "react";
import "./header.css";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "../Logout/Logout";

function Header() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="header">
      <span className="botonheader">{isAuthenticated && <Logout />}</span>
      <h1 className="textoHeader">Bienvenido a Blogs</h1>
    </div>
  );
}

export default Header;

import React from "react";
import "./header.css";

import Logout from "../Logout/Logout";

function Header(props) {
  return (
    <div className="header">
      <span className="botonheader">
        {props.isAuthenticated && (
          <Logout
            isAuthenticated={props.isAuthenticated}
            setIsAuthenticated={props.setIsAuthenticated}
          />
        )}
      </span>
      <h1 className="textoHeader">Bienvenido a Blogs</h1>
    </div>
  );
}

export default Header;

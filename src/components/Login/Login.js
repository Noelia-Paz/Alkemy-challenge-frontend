import React from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";

function Login() {
  let navigate = useNavigate();
  return (
    <div className="divLogin">
      <button
        className="botonLogin"
        onClick={() => {
          navigate("/loginUser");
        }}
      >
        <ion-icon name="person-circle-outline"></ion-icon>
        <h1 className="textoLogin">Ingresar</h1>
      </button>
    </div>
  );
}

export default Login;

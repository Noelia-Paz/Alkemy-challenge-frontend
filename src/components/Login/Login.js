import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./login.css";

function Login() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="botonlog">
      <button className="botonLogin" onClick={() => loginWithRedirect()}>
        <ion-icon name="person-add-outline"></ion-icon>
        Login
      </button>
    </div>
  );
}

export default Login;

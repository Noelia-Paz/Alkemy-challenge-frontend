import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./detalles.css";
import { useAuth0 } from "@auth0/auth0-react";

function DetallesBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state.blog;
  const { isAuthenticated } = useAuth0();

  return (
    <div className="contorno">
      <div>
        <h1>Detalles del Blog</h1>
      </div>
      <div>
        <table className="tabla">
          <tbody>
            <tr>
              <th>Titulo</th>
              <th>Contenido</th>
              <th>Imagen</th>
              <th>Categoria</th>
            </tr>
            <tr>
              <td>{blog.titulo}</td>
              <td>{blog.contenido}</td>
              <td>{blog.imagen}</td>
              <td>{blog.categoriaId}</td>
            </tr>
          </tbody>
        </table>
        <div className="botones">
          {isAuthenticated ? (
            <button
              className="boton-editar"
              onClick={() => {
                navigate("/editar", { state: { blog: blog } });
              }}
            >
              Editar
            </button>
          ) : (
            <></>
          )}

          <button
            className="boton-atras"
            onClick={() => {
              navigate("/");
            }}
          >
            Atras
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetallesBlog;

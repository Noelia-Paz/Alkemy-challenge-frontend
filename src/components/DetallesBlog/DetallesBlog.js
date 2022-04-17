import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./detalles.css";

function DetallesBlog(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state.blog;

  return (
    <div className="contorno">
      <h1>Detalles del Blog</h1>
      <table className="tabla">
        <tbody>
          <tr>
            <th>Titulo</th>
            <th>Contenido</th>
            <th>Imagen</th>
          </tr>
          <tr>
            <td>{blog.titulo}</td>
            <td>{blog.contenido}</td>
            <td>{blog.imagen}</td>
          </tr>
        </tbody>
      </table>
      <div className="botones">
        {props.isAuthenticated ? (
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
  );
}

export default DetallesBlog;

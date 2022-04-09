import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./blogcard.css";
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";

function BlogCard(props) {
  let navigate = useNavigate();

  const deleteBlog = (blogId) => {
    axios.delete(`/api/blog/${blogId}`);
    props.deleteBtn(blogId);
  };
  const mostrarAlerta = () => {
    swal({
      title: "Eliminar",
      text: "¿Estas seguro que deseas eliminar el Blog?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        deleteBlog(props.blog.id);
        swal({
          text: "El archivo se a eliminado con exito",
          icon: "success",
          timer: "2000",
        });
      }
    });
  };

  const { isAuthenticated } = useAuth0();

  return (
    <div className="container">
      <div className="card">
        <figure>
          <img src={props.blog.imagen} />
        </figure>
        <div className="card-texto">
          <h5>{props.blog.titulo}</h5>
          <p>{props.blog.contenido}</p>
        </div>
        <div className="card-botones">
          <button
            className="boton-detalles"
            onClick={() => {
              navigate("/detalles", { state: { blog: props.blog } });
            }}
          >
            Mas Detalles
          </button>
          {isAuthenticated ? (
            <button
              className="boton-eliminar"
              onClick={() => {
                mostrarAlerta();
              }}
            >
              Eliminar
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;

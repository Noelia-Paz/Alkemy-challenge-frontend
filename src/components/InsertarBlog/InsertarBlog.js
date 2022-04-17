import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./insertar.css";
import swal from "sweetalert";
import { useForm } from "react-hook-form";

function InsertarBlog() {
  let navigate = useNavigate();

  const verificarExtensionImagen = (imagen) => {
    const extensionesValidas = ".png, .gif, .jpeg, .jpg";
    const extension = imagen
      .substring(imagen.lastIndexOf(".") + 1)
      .toLowerCase();
    const extensionValida = extensionesValidas.indexOf(extension);
    if (extensionValida < 0) {
      swal("La extension de la imagen es incorrecta ");
    } else {
      return true;
    }
  };

  const onSubmit = async (datos, event) => {
    event.preventDefault();
    if (verificarExtensionImagen(datos.imagen)) {
      await axios.post(`/api/blog/`, {
        titulo: datos.titulo,
        contenido: datos.contenido,
        imagen: datos.imagen,
      });
      navigate("/");
    } else {
      return;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="contenedor-form">
      <p className="textoBlog">Escribe un Nuevo Blog</p>
      <form className="formInsertar" onSubmit={handleSubmit(onSubmit)}>
        <label className="labelInsertar">Tilulo</label>
        <input
          className="inputInsertar"
          type="text"
          name="titulo"
          placeholder="Escribi un titulo"
          {...register("titulo", {
            required: {
              value: true,
              message: "El campo es requerido",
            },
            minLength: {
              value: 3,
              message: "Escribe al menos 3 caracteres",
            },
          })}
        />
        {errors.titulo && (
          <span className="mensaje">{errors.titulo.message}</span>
        )}

        <label className="labelInsertar">Contenido</label>
        <input
          className="inputInsertar"
          type="text"
          name="contenido"
          placeholder="Escribi un contenido"
          {...register("contenido", {
            required: {
              value: true,
              message: "El campo no puede estar vacio",
            },

            maxLength: {
              value: 50,
              message: "El contenido es muy largo",
            },

            minLength: {
              value: 5,
              message: "Escribe al menos 5 caracteres",
            },
          })}
        />
        {errors.contenido && (
          <span className="mensaje">{errors.contenido.message}</span>
        )}

        <label className="labelInsertar">Imagen</label>
        <input
          className="inputInsertar"
          type="url"
          name="imagen"
          placeholder="Imagen.jpeg"
          {...register("imagen", {
            required: {
              value: true,
              message: "El campo es requerido",
            },
          })}
        />
        {errors.imagen && (
          <span className="mensaje">{errors.imagen.message}</span>
        )}

        <input className="botonInsertar" type="submit" value="Crear" />
        <button
          className="boton-volver"
          onClick={() => {
            navigate("/");
          }}
        >
          Atras
        </button>
      </form>
    </div>
  );
}

export default InsertarBlog;

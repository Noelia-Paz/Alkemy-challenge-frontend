import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editarBlog.css";
import swal from "sweetalert";
import { useForm } from "react-hook-form";

function EditarBlog() {
  const location = useLocation();
  const blog = location.state.blog;
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
      await axios.put(`/api/blog/${blog.id}`, {
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
    <div className="base">
      <p className="textoEditar">Edita tu Blog</p>
      <form className="formEditar" onSubmit={handleSubmit(onSubmit)}>
        <label className="labelEditar">Titulo</label>
        <input
          className="inputEditar"
          type="text"
          name="titulo"
          placeholder="Escribi un titulo"
          defaultValue={blog.titulo}
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
        {errors.titulo && <span className="msg">{errors.titulo.message}</span>}

        <label className="labelEditar">Contenido</label>
        <input
          className="inputEditar"
          type="text"
          name="contenido"
          placeholder="Escribi un contenido"
          defaultValue={blog.contenido}
          {...register("contenido", {
            required: {
              value: true,
              message: "El campo es requerido",
            },

            minLength: {
              value: 5,
              message: "Escribe al menos 5 caracteres",
            },
          })}
        />
        {errors.contenido && (
          <span className="msg">{errors.contenido.message}</span>
        )}

        <label className="labelEditar">Imagen</label>
        <input
          className="inputEditar"
          type="url"
          name="imagen"
          placeholder="Link de imagen"
          defaultValue={blog.imagen}
          {...register("imagen", {
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
        {errors.imagen && <span className="msg">{errors.imagen.message}</span>}

        <div className="botonesBlog">
          <input className="botonAplicar" type="submit" value="Aplicar" />
          <button
            className="atras"
            onClick={() => {
              navigate("/");
            }}
          >
            Atras
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarBlog;

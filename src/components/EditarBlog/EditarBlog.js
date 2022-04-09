import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editarBlog.css";
import swal from "sweetalert";
import { useForm } from "react-hook-form";

function EditarBlog() {
  const location = useLocation();
  const blog = location.state.blog;
  let navigate = useNavigate();

  const [titulo, setTitulo] = useState(blog.titulo);
  const [contenido, setContenido] = useState(blog.contenido);
  const [imagen, setImagen] = useState(blog.imagen);

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

  /*const onSubmit = async (e) => {
    e.preventDefault();
    verificarExtensionImagen(imagen);
    await axios.put(`/api/blog/${blog.id}`, {
      titulo: titulo,
      contenido: contenido,
      imagen: imagen,
    });
    navigate("/");
  };*/

  const onChange = (e) => {
    if (e.target.name === "titulo") {
      setTitulo(e.target.value);
    } else if (e.target.name === "contenido") {
      setContenido(e.target.value);
    } else {
      setImagen(e.target.value);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="base">
      <p className="texto-blog">Edita tu Blog</p>
      <div className="contenido">
        <form
          className="form"
          onSubmit={handleSubmit(onSubmit)} /*onSubmit={onSubmit}*/
        >
          <div>
            <label className="label-blog">Titulo</label>
            <input
              className="input-blog"
              type="text"
              name="titulo"
              placeholder="Escribi un titulo"
              onChange={onChange}
              defaultValue={titulo}
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
              <span className="msg">{errors.titulo.message}</span>
            )}
          </div>
          <div>
            <label className="label-blog">Contenido</label>
            <input
              className="input-blog"
              type="text"
              name="contenido"
              placeholder="Escribi un contenido"
              onChange={onChange}
              defaultValue={contenido}
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
          </div>
          <div>
            <label className="label-blog">Imagen</label>
            <input
              className="input-blog"
              type="url"
              name="imagen"
              placeholder="Link de imagen"
              onChange={onChange}
              defaultValue={imagen}
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
            {errors.imagen && (
              <span className="msg">{errors.imagen.message}</span>
            )}
          </div>
          <div className="boton-blog">
            <input className="boton-form" type="submit" value="Editar" />
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
    </div>
  );
}

export default EditarBlog;

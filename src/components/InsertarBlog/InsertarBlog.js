import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./insertar.css";
import swal from "sweetalert";
import { useForm } from "react-hook-form";

function InsertarBlog() {
  let navigate = useNavigate();

  // const [titulo, setTitulo] = useState("");
  // const [contenido, setContenido] = useState("");
  // const [imagen, setImagen] = useState("");

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

  // const onChange = (e) => {
  //   if (e.target.name === "titulo") {
  //     setTitulo(e.target.value);
  //   } else if (e.target.name === "contenido") {
  //     setContenido(e.target.value);
  //   } else {
  //     setImagen(e.target.value);
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <p className="texto">Escribe un Nuevo Blog</p>
      <div>
        <div className="contenedor-form">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label">Tilulo</label>
              <input
                className="input"
                type="text"
                name="titulo"
                placeholder="Escribi un titulo"
                // onChange={onChange}
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
            </div>
            <div>
              <label className="label">Contenido</label>
              <input
                className="input"
                type="text"
                name="contenido"
                placeholder="Escribi un contenido"
                //onChange={onChange}
                {...register("contenido", {
                  required: {
                    value: true,
                    message: "El campo no puede estar vacio",
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
            </div>
            <div>
              <label className="label">Imagen</label>
              <input
                className="input"
                type="url"
                name="imagen"
                placeholder="Link de imagen"
                //onChange={onChange}
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
            </div>
            <input className="boton" type="submit" value="Crear" />
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
      </div>
    </div>
  );
}

export default InsertarBlog;

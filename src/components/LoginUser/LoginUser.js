import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./loginUser.css";
import jwt_decode from "jwt-decode";
import swal from "sweetalert";

function LoginUser(props) {
  const { admin, setAdmin } = props;
  let navigate = useNavigate();
  const onSubmit = async (datos, event) => {
    event.preventDefault();
    await axios
      .post(`api/user/signin`, {
        email: datos.email,
        password: datos.password,
      })
      .then((res) => {
        if (res.data.token) {
          const decoded = jwt_decode(res.data.token);
          if (decoded.isAdmin) {
            localStorage.setItem("isAdmin", JSON.stringify(decoded.isAdmin));
            setAdmin(!admin);
            navigate("/");
            swal({
              text: "Ingresaste con exito!",
              icon: "success",
            });
          }
        } else {
          swal({
            text: res.data.message,
            icon: "error",
          });
        }
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="divContenedor">
      <p className="textoLogin">Iniciar Sesion</p>
      <form className="formLogin" onSubmit={handleSubmit(onSubmit)}>
        <label className="labelLogin">Email</label>
        <input
          className="inputLogin"
          type="text"
          name="email"
          placeholder="ejemplo@gmail.com"
          autoComplete="off"
          {...register("email", {
            required: {
              value: true,
              message: "El campo no puede estar vacio",
            },
            pattern: {
              value:
                /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
              message: "El formato no es correcto",
            },
          })}
        />
        {errors.email && (
          <span className="mensaje">{errors.email.message}</span>
        )}

        <label className="labelLogin">Contraseña</label>
        <input
          className="inputLogin"
          type="password"
          name="password"
          placeholder="Escribe una contraseña"
          {...register("password", {
            required: {
              value: true,
              message: "El campo es requerido",
            },
            minLength: {
              value: 4,
              message: "Escribe al menos 4 caracteres",
            },
          })}
        />
        {errors.password && (
          <span className="mensajeUser">{errors.password.message}</span>
        )}

        <input className="botonIngresar" type="submit" value="Ingresar" />
        <button
          className="AtrasLogin"
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

export default LoginUser;

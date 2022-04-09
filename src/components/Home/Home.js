import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import "./home.css";

//componentes
import BlogCard from "../BlogCard/BlogCard";
import Login from "../Login/Login";

function Home() {
  let navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`/api/blog`).then((res) => {
      const blogsDB = res.data;
      setBlogs(blogsDB);
    });
  }, []);

  const deleteBtn = (blogId) => {
    const filteredBlogs = blogs.filter((blog) => blog.id !== blogId);
    setBlogs(filteredBlogs);
  };

  const { isAuthenticated } = useAuth0();

  return (
    <div className="contenedor">
      <div className="boton1">
        {isAuthenticated ? (
          <button
            onClick={() => {
              navigate("/insertar");
            }}
            className="botonInsertar"
          >
            <h2 className="textoBoton">Crear Nuevo Blog</h2>
          </button>
        ) : (
          <>
            {" "}
            <Login />
          </>
        )}
      </div>
      <div className="cards">
        {blogs.map((blog) => {
          return <BlogCard blog={blog} key={blog.id} deleteBtn={deleteBtn} />;
        })}
      </div>
      <footer className="pie">
        <h5 className="texto-pie">Pagina React Css 2022</h5>
      </footer>
    </div>
  );
}

export default Home;

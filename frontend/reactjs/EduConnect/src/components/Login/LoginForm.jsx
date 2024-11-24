import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/main");
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleLoginWithApi = async (e) => {
    e.preventDefault();
  
    if (username && password) {
      setError(""); // Limpiar errores previos
  
      try {
        const response = await axios.post(
          'http://localhost:8080/api/usuarios/login', 
          { username, password },
          { headers: { 'Content-Type': 'application/json' } }
        );
  
        console.log("Respuesta de la API:", response.data); // Verificar respuesta de la API
  
        // Comprobar si la respuesta contiene el token
        const { token } = response.data;
  
        if (token) {
          // Guardar el nombre de usuario ingresado y el token en el localStorage
          localStorage.setItem('username', username);  // Usamos el username del formulario
          localStorage.setItem('token', token);
  
          // Redirigir a la página principal
          navigate("/main");
        } else {
          setError("La respuesta de la API no contiene el token.");
        }
      } catch (err) {
        console.error("Error al iniciar sesión con la API:", err);
        setError("Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.");
      }
    } else {
      setError("Por favor ingresa tu nombre de usuario y contraseña.");
    }
  };
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("Usuario autenticado con Google:", user);
    
        const email = user.email;
        const emailRegex = /^[a-zA-Z0-9._-]+@tecsup\.edu\.pe$/; // Expresión regular para @tecsup.edu.pe
    
        if (!emailRegex.test(email)) {
          alert("Solo se permite iniciar sesión con un correo electrónico de tipo @tecsup.edu.pe");
          return;
        }
    
        // Obtener el idToken de Google
        user.getIdToken().then((idToken) => {
          // Configura el estado de usuario
          setUserData({
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          });
  
          // Almacenar en localStorage
          localStorage.setItem('token', idToken); // Almacena el id_token de Google
          localStorage.setItem('username', user.displayName);
          localStorage.setItem('userData', JSON.stringify({
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          }));
  
          // Redirige a la ruta /main
          navigate("/main", { 
            state: { 
              userDataFromGoogle: { 
                name: user.displayName, 
                email: user.email, 
                photoUrl: user.photoURL 
              }
            } 
          });
        }).catch((error) => {
          console.error("Error al obtener el idToken de Google:", error);
          alert("Hubo un error al obtener el token de Google.");
        });
      })
      .catch((error) => {
        console.error("Error en inicio de sesión con Google:", error);
        alert("Hubo un error al iniciar sesión con Google.");
      });
  };
  const handleGitHubLogin = () => {
    // Lógica similar a Google, solo si quieres agregar GitHub también
    console.log("GitHub login logic");
  };

  return (
    <div className='bodyLogin'>
      <div className="form-container">
        <p className="title">Inicio de Sesion en EduConnect</p>
        <div className="image-box">
          <img
            src="https://i.ibb.co/q924KnC/educonnect.png"
            alt="EduConnect Logo"
            className="register-image"
          />
        </div>
        <form className="form" onSubmit={handleLoginWithApi}>
          <div className="input-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Ingrese su nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="sign">Iniciar Sesion</button>
        </form>
        <div className="social-message">
          <div className="line"></div>
          <p className="message">Iniciar Sesion con</p>
          <div className="line"></div>
        </div>
        <div className="social-icons">
          <button className="icon" onClick={handleGoogleLogin}>
            <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button className="icon" onClick={handleGitHubLogin}>
            <FontAwesomeIcon icon={faGithub} />
          </button>
        </div>
        <p className="signup">
          <span>No tienes una cuenta?</span>
          <Link to="/register"> Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

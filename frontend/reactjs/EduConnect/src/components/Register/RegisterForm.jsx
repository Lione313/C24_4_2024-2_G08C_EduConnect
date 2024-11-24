import React, { useState } from 'react';
import './RegisterForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import axios from 'axios';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [username, setUsername] = useState("");
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState); 
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevState => !prevState);  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validar que el correo tenga el dominio correcto
    const emailRegex = /^[a-zA-Z0-9._%+-]+@tecsup\.edu\.pe$/;
    if (!emailRegex.test(correo)) {
      setError("El correo debe ser @tecsup.edu.pe");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
  
    if (!username || !correo || !password) { 
      setError("Por favor, completa todos los campos.");
      return;
    }
  
    const userData = {
      username,
      correo,
      password
    };
  
    axios.post('http://localhost:8080/api/usuarios/registrar', userData)
      .then(response => {
        console.log("Registro exitoso:", response.data);
        setSuccessMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setError("");
        navigate("/"); 
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          setError(error.response.data); 
        } else if (error.code === 'ERR_NETWORK') {
          setError("No se pudo conectar al servidor. Asegúrate de que el servidor esté en ejecución.");
        } else {
          console.error("Error en el registro:", error);
          setError("Hubo un problema al registrar la cuenta. Intenta de nuevo.");
        }
      });
  };

  return (
    <div className="bodyRegister">
      <div className="form-container">
        <div className="form-box">
          <h2 className="title">Regístrate en EduConnect</h2>
          <div className="image-box">
            <img
              src="https://i.ibb.co/q924KnC/educonnect.png"
              alt="Register"
              className="register-image"
            />
          </div>
  
          <form onSubmit={handleSubmit}>
            {/* Nombre de usuario */}
            <div className="input-group">
              <label htmlFor="username">Nombre de Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
  
            {/* Correo */}
            <div className="input-group">
              <label htmlFor="correo">Correo Institucional</label>
              <input
                type="email"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
  
            {/* Contraseña */}
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
  
            {/* Confirmar contraseña */}
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirma tu Contraseña</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-icon"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} 
                </button>
              </div>
            </div>
  
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
  
            <button type="submit" className="sign">
              Regístrate
            </button>
          </form>
  
          <p className="signup">
            <span>¿Ya tienes una cuenta?</span>
            <Link to="/"> Inicia Sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

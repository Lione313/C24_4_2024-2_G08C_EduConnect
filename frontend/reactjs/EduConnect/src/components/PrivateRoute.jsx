// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('userData');
  const googleUserData = localStorage.getItem('googleUserData');

  // Verificar si hay token o datos de usuario (ya sea API o Google)
  if (!token && !userData && !googleUserData) {
    return <Navigate to="/" replace />; // Redirige al login si no hay autenticación
  }

  return children; // Si hay token o datos de usuario, se muestra la ruta protegida
};

export default PrivateRoute;

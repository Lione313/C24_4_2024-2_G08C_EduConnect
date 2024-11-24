import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [googleUserData, setGoogleUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Obtener datos del localStorage
    const storedUserData = localStorage.getItem('userData');
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedGoogleUserData = localStorage.getItem('googleUserData');

    // Verificar si existe información en el localStorage
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
      } catch (error) {
        console.error('Error al parsear los datos de localStorage:', error);
      }
    }

    if (storedGoogleUserData) {
      try {
        const parsedGoogleData = JSON.parse(storedGoogleUserData);
        setGoogleUserData(parsedGoogleData);
      } catch (error) {
        console.error('Error al parsear los datos de Google:', error);
      }
    }

    setToken(storedToken);
    setUsername(storedUsername); // Asegúrate de que estás obteniendo el username
    setIsLoading(false);
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // Redirigir al login
  };

  // Si está cargando, mostrar mensaje de "Loading..."
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>EduConnect - Main</title>
      </Helmet>

      {/* Mostrar mensaje de bienvenida según los datos disponibles */}
      {userData ? (
        <div>
          <h1>Bienvenido, {userData.name}!</h1>
          <p>Email: {userData.email}</p>
          {userData.photoUrl && <img src={userData.photoUrl} alt="Foto de perfil" />}
        </div>
      ) : googleUserData ? (
        <div>
          <h1>Bienvenido, {googleUserData.name}!</h1>
          <p>Email: {googleUserData.email}</p>
          {googleUserData.photoUrl && <img src={googleUserData.photoUrl} alt="Foto de perfil de Google" />}
        </div>
      ) : token && username ? (
        <div>
          <h1>Bienvenido, {username}!</h1>
          <p>Token recibido: {token}</p>
        </div>
      ) : (
        <h1>Bienvenido a EduConnect</h1>
      )}

      {/* Botón de logout */}
      {(userData || googleUserData || token || username) && (
        <button onClick={handleLogout}>Cerrar sesión</button>
      )}
    </div>
  );
};

export default MainPage;

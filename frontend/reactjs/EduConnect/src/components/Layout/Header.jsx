import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Bell, MessageCircle, UserPlus } from 'react-feather'; // Importa los íconos necesarios

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark p-3 d-flex justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="navbar-brand">
            <img src="/static/images/logov_1.png" alt="Logo" className="rounded-circle" width="40" height="40" />
          </Link>
          <div className="position-relative">
            <input
              type="text"
              placeholder="Buscar"
              className="form-control ps-5"
            />
          </div>
        </div>
        <div className="d-flex align-items-center gap-4">
          <Link to="/" className="btn text-white">
            <Home /> {/* Ícono de Home */}
          </Link>
          <Link to="/amigos" className="btn text-white">
            <UserPlus /> {/* Ícono de Agregar Amigos */}
          </Link>
          <Link to="/mensajes" className="btn text-white">
            <MessageCircle /> {/* Ícono de Mensajes */}
          </Link>
          <Link to="/notificaciones" className="btn text-white">
            <Bell /> {/* Ícono de Campanita para Notificaciones */}
          </Link>
          <Link to="/perfil" className="navbar-brand">
            <img src="/static/images/" alt="Perfil" className="rounded-circle" width="40" height="40" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
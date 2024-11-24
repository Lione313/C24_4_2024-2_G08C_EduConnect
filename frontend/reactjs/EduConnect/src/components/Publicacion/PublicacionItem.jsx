import React from 'react';

const PublicacionItem = ({ publicacion }) => {
  return (
    <div className="publicacion-card">
      <div className="card-body">
        <h5 className="card-title">{publicacion.titulo}</h5>
        <p className="card-text">{publicacion.contenido}</p>
        {publicacion.imagenUrl && <img src={publicacion.imagenUrl} alt={publicacion.titulo} className="img-fluid" />}
      </div>
    </div>
  );
};

export default PublicacionItem;
import React, { useState } from 'react';

const ComentarioItem = ({ comentario, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comentario.contenido);

  console.log("onDelete function:", onDelete); // Asegúrate de que no sea undefined.

  const handleDelete = () => {
    if (onDelete) {
      onDelete(comentario.id); // Se invoca la función.
    } else {
      console.error("onDelete is not defined!");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onEdit) {
      onEdit(comentario.id, editedText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(comentario.contenido);
  };

  return (
    <div className="comentario-card mt-2">
      <div className="card-body d-flex justify-content-between align-items-start">
        {isEditing ? (
          <>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="form-control"
            />
            <div>
              <button onClick={handleSave} className="btn btn-success mt-2">Guardar</button>
              <button onClick={handleCancel} className="btn btn-secondary mt-2 ms-2">Cancelar</button>
            </div>
          </>
        ) : (
          <>
            <p className="card-text">{comentario.contenido}</p>
            <select onChange={(e) => {
              if (e.target.value === 'editar') {
                handleEdit();
              } else if (e.target.value === 'eliminar') {
                handleDelete();
              }
            }}>
              <option value="">Acciones</option>
              <option value="editar">Editar</option>
              <option value="eliminar">Eliminar</option>
            </select>
          </>
        )}
      </div>
    </div>
  );
};

export default ComentarioItem;

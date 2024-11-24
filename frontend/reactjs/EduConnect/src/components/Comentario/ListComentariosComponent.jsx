import React, { useEffect, useState } from 'react';
import comentarioService from '../../services/comentarioService';
import { Link } from 'react-router-dom';
import ComentarioItem from './ComentarioItem';

export const ListComentariosComponent = ({ publicacionId, onDelete, onEdit }) => {
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        listarComentarios();
    }, [publicacionId]);

    const listarComentarios = () => {
        comentarioService.getComentariosByPublicacionId(publicacionId).then((response) => {
            setComentarios(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div className="container" style={{ marginTop: "80px" }}>
            <h2 className="text-center">Listado de Comentarios</h2>
            <div className="comentarios-section">
                {comentarios.map(comentario => (
                    <ComentarioItem
                        key={comentario.id}
                        comentario={comentario}
                        onDelete={onDelete} // Aquí se debe pasar como prop.
                        onEdit={onEdit}     // Aquí también.
                    />
                ))}
            </div>
        </div>
    );
};

export default ListComentariosComponent;

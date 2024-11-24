import React, { useState } from 'react';
import comentarioService from '../../services/comentarioService';

const AddComentarioComponent = ({ publicacionId, onComentarioAdded }) => {
    const [contenido, setContenido] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        comentarioService.addComentario(publicacionId, contenido).then(() => {
            setContenido('');
            onComentarioAdded();
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div className="container" style={{ marginTop: "80px" }}>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center">Nuevo Comentario</h2>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <label className="form-label">Contenido:</label>
                                <textarea
                                    placeholder="Escriba el contenido"
                                    name="txtContenido"
                                    className="form-control"
                                    value={contenido}
                                    onChange={(e) => setContenido(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Agregar Comentario</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddComentarioComponent;
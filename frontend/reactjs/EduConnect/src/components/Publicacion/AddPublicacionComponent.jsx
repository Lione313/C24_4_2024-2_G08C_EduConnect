import React, { useState } from 'react';
import publicacionService from '../../services/publicacionService';
import { useNavigate } from 'react-router';

export const AddPublicacionComponent = () => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [imagen, setImagen] = useState(null);
    const navigate = useNavigate();

    const savePublicacion = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('contenido', contenido);
        if (imagen) {
            formData.append('imagen', imagen);
        }

        // Verificar el contenido del FormData
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        publicacionService.createPublicacion(formData).then(() => {
            navigate('/publicaciones');
        }).catch(error => {
            console.log(error);
        });
    };

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleCancel = () => {
        navigate('/publicaciones');
    };

    return (
        <div className='container' style={{ marginTop: "80px" }}>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3 publicacion-form-card'>
                    <h2 className='text-center text-white'>Nueva Publicación</h2>
                    <div className='card-body'>
                        <form onSubmit={savePublicacion}>
                            <div className='form-group mb-2'>
                                <label className='form-label text-white'>Título:</label>
                                <input
                                    type='text'
                                    placeholder='Escriba el título'
                                    name='titulo'
                                    className='form-control'
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label text-white'>Contenido:</label>
                                <textarea
                                    placeholder='Escriba el contenido'
                                    name='contenido'
                                    className='form-control'
                                    value={contenido}
                                    onChange={(e) => setContenido(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label text-white'>Imagen (opcional):</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className='d-flex justify-content-between'>
                                <button type='submit' className='btn btn-primary'>Guardar</button>
                                <button type='button' className='btn btn-secondary' onClick={handleCancel}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPublicacionComponent;
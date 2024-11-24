import React, { useState, useEffect } from 'react';
import publicacionService from '../../services/publicacionService';
import { useNavigate, useParams } from 'react-router';

export const EditPublicacionComponent = () => {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [imagen, setImagen] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        publicacionService.getPublicacionById(id).then(response => {
            setTitulo(response.data.titulo);
            setContenido(response.data.contenido);
        }).catch(error => {
            console.log(error);
        });
    }, [id]);

    const updatePublicacion = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('contenido', contenido);
        if (imagen) {
            formData.append('imagen', imagen);
        }

        publicacionService.updatePublicacion(id, formData).then(() => {
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
                    <h2 className='text-center text-white'>Editar Publicación</h2>
                    <div className='card-body'>
                        <form onSubmit={updatePublicacion}>
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

export default EditPublicacionComponent;
import React, { useEffect, useState } from 'react';
import publicacionService from '../../services/publicacionService';
import { Link } from 'react-router-dom';
import { UserPlus, Users } from 'react-feather'; // Importa los íconos necesarios

export const ListPublicacionesComponent = () => {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        listarPublicaciones();
    }, []);

    const listarPublicaciones = () => {
        publicacionService.getAllPublicaciones().then(response => {
            // Asegúrate de que response.data es un array
            if (Array.isArray(response.data)) {
                setPublicaciones(response.data);
            } else {
                console.error('La respuesta del servicio no es un array:', response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    };

    const deletePublicacion = (publicacionId) => {
        publicacionService.deletePublicacion(publicacionId).then(() => {
            listarPublicaciones();
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div className='container-fluid' style={{ marginTop: "80px" }}>
            <div className='row'>
                <div className='col-md-3 fixed-sidebar'>
                    <div className='card' style={{ height: '100%', marginLeft: '0' }}>
                        <div className='card-body'>
                            <div className='d-flex align-items-center mb-3'>
                                <UserPlus size={20} />
                                <Link to='/tus-grupos' className='ms-2 text-decoration-none text-white'>Tus grupos</Link>
                            </div>
                            <div className='d-flex align-items-center mb-3'>
                                <Users size={20} />
                                <Link to='/tus-comunidades' className='ms-2 text-decoration-none text-white'>Tus Comunidades</Link>
                            </div>
                            <button className='btn btn-primary mt-3'>+ Crear Nueva Comunidad</button>
                            <div className='mt-4'>
                                <h6 className='text-white'>Grupos a los que te uniste</h6>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src='/path/to/grupo1.png' alt='Grupo 1' className='rounded-circle' width='40' height='40' />
                                    <span className='ms-2 text-white'>nombre_grupo</span>
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src='/path/to/grupo2.png' alt='Grupo 2' className='rounded-circle' width='40' height='40' />
                                    <span className='ms-2 text-white'>nombre_grupo</span>
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src='/path/to/grupo3.png' alt='Grupo 3' className='rounded-circle' width='40' height='40' />
                                    <span className='ms-2 text-white'>nombre_grupo</span>
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src='/path/to/grupo4.png' alt='Grupo 4' className='rounded-circle' width='40' height='40' />
                                    <span className='ms-2 text-white'>nombre_grupo</span>
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src='/path/to/grupo5.png' alt='Grupo 5' className='rounded-circle' width='40' height='40' />
                                    <span className='ms-2 text-white'>nombre_grupo</span>
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src='/path/to/grupo6.png' alt='Grupo 6' className='rounded-circle' width='40' height='40' />
                                    <span className='ms-2 text-white'>nombre_grupo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-9 main-content'>
                    <h2 className='text-center text-white'>Listado de Publicaciones</h2>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                        <Link to='/add-publicacion' className='btn btn-primary'>Agregar Publicación</Link>
                    </div>
                    <div className='row'>
                        {publicaciones.map(publicacion => (
                            <div key={publicacion.id} className='col-md-12 mb-4'>
                                <div className='card publicacion-card' style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
                                    <div className='card-body'>
                                        <h5 className='card-title text-white'>{publicacion.titulo}</h5>
                                        <p className='card-text text-white'>{publicacion.contenido}</p>
                                        {publicacion.imagenUrl && <img src={publicacion.imagenUrl} alt={publicacion.titulo} className="img-fluid" style={{ maxHeight: '300px', objectFit: 'cover', width: '100%', display: 'block', margin: '0 auto' }} />}
                                        <div className='d-flex justify-content-between mt-3'>
                                            <Link to={`/edit-publicacion/${publicacion.id}`} className='btn btn-info'>Actualizar</Link>
                                            <Link to={`/publicacion/${publicacion.id}`} className='btn btn-primary'>Comentar</Link>
                                            <button className='btn btn-danger' onClick={() => deletePublicacion(publicacion.id)}>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListPublicacionesComponent;
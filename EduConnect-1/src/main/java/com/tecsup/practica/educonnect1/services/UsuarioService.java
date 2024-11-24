package com.tecsup.practica.educonnect1.services;

import com.tecsup.practica.educonnect1.dto.UsuarioLoginDTO;
import com.tecsup.practica.educonnect1.dto.UsuarioRegistroDTO;
import com.tecsup.practica.educonnect1.models.entities.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    // Registrar un nuevo usuario con token de verificación
    Optional<Usuario> registrarUsuario(UsuarioRegistroDTO registroDTO);

    // Verificar si un token JWT es válido
    boolean isValidToken(String token);

    // Obtener todos los usuarios
    List<Usuario> obtenerUsuarios();

    // Iniciar sesión con nombre de usuario y contraseña
    Optional<String> iniciarSesion(UsuarioLoginDTO loginDTO);

    // Iniciar sesión con el token de Firebase
    Optional<String> iniciarSesionConFirebase(String tokenFirebase);

    // Obtener un token de Firebase para un usuario específico
    Optional<String> getTokenFirebase(String username);

}

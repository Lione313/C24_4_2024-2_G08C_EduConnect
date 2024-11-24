package com.tecsup.practica.educonnect1.models.daos;

import com.tecsup.practica.educonnect1.models.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreo(String correo);
    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findByUid(String uid);  // Método para encontrar el usuario por el UID de Firebase
}

package com.tecsup.practica.educonnect1.services;

import com.tecsup.practica.educonnect1.models.entities.Usuario;
import com.tecsup.practica.educonnect1.models.daos.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service // Indica que esta clase es un servicio de Spring
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository; // Repositorio para acceder a los usuarios

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder; // Encoder para las contraseñas (asegurarse de que sea un bean configurado)

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Busca el usuario por correo
        Usuario usuario = usuarioRepository.findByCorreo(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        // Si la contraseña está encriptada en la base de datos, no es necesario encriptarla aquí
        // Se asegura que la contraseña es válida en base a las reglas de seguridad

        // Agregar roles de ejemplo (puedes cambiar esto según tu estructura)
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER")); // Agrega roles dependiendo de tu lógica

        // Devuelve un objeto UserDetails basado en el usuario encontrado, con roles
        return new org.springframework.security.core.userdetails.User(
                usuario.getCorreo(), // Usa el correo como nombre de usuario
                usuario.getPassword(), // Contraseña encriptada en la base de datos
                authorities); // Agregar roles/autoridades
    }

    // Puedes agregar un método para encriptar contraseñas antes de almacenarlas en la base de datos
    public String encriptarPassword(String password) {
        return passwordEncoder.encode(password); // Utiliza BCryptPasswordEncoder u otro en función de tu configuración
    }
}

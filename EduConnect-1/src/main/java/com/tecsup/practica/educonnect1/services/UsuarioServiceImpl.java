package com.tecsup.practica.educonnect1.services;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.tecsup.practica.educonnect1.dto.UsuarioLoginDTO;
import com.tecsup.practica.educonnect1.dto.UsuarioRegistroDTO;
import com.tecsup.practica.educonnect1.models.entities.Usuario;
import com.tecsup.practica.educonnect1.models.daos.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Autowired
    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
                              JwtService jwtService, CustomUserDetailsService userDetailsService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Optional<Usuario> registrarUsuario(UsuarioRegistroDTO registroDTO) {
        Usuario usuario = new Usuario();
        usuario.setUsername(registroDTO.getUsername());
        usuario.setCorreo(registroDTO.getCorreo());
        usuario.setPassword(passwordEncoder.encode(registroDTO.getPassword()));

        // Guardar el usuario
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        return Optional.of(nuevoUsuario);
    }

    @Override
    public boolean isValidToken(String token) {
        try {
            String username = jwtService.obtenerUsernameDelToken(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            return jwtService.validarToken(token, userDetails.getUsername());
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Optional<String> iniciarSesion(UsuarioLoginDTO loginDTO) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(loginDTO.getUsername());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (passwordEncoder.matches(loginDTO.getPassword(), usuario.getPassword())) {
                String token = jwtService.generarToken(usuario.getUsername());
                return Optional.of(token);
            }
        }
        return Optional.empty();
    }

    @Override
    public Optional<String> iniciarSesionConFirebase(String tokenFirebase) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(tokenFirebase);
            String uid = decodedToken.getUid();

            Optional<Usuario> usuarioOpt = usuarioRepository.findByUid(uid);

            if (usuarioOpt.isPresent()) {
                Usuario usuario = usuarioOpt.get();
                String jwtToken = jwtService.generarToken(usuario.getUsername());
                return Optional.of(jwtToken);
            }
        } catch (Exception e) {
            return Optional.empty();
        }
        return Optional.empty();
    }

    @Override
    public Optional<String> getTokenFirebase(String username) {
        return Optional.empty();
    }
}

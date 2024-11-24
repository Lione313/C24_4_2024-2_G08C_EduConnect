package com.tecsup.practica.educonnect1.controllers;

import com.tecsup.practica.educonnect1.dto.UsuarioLoginDTO;
import com.tecsup.practica.educonnect1.models.entities.Usuario;
import com.tecsup.practica.educonnect1.dto.UsuarioRegistroDTO;

import com.tecsup.practica.educonnect1.services.UsuarioService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

import java.util.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

public class UsuarioController {

    private final UsuarioService usuarioService;

    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerUsuarios() {
        List<Usuario> usuarios = usuarioService.obtenerUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarUsuario(@RequestBody UsuarioRegistroDTO registroDTO) {
        // Llamar al servicio para registrar al usuario
        Optional<Usuario> usuarioOptional = usuarioService.registrarUsuario(registroDTO);

        if (usuarioOptional.isPresent()) {
            // Si el registro es exitoso, respondemos con un mensaje de éxito
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente.");
        } else {
            // En caso de error, devolvemos un mensaje de conflicto
            String mensajeError = "No se pudo registrar el usuario.";
            return ResponseEntity.status(HttpStatus.CONFLICT).body(mensajeError);
        }
    }



    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> iniciarSesion(@RequestBody UsuarioLoginDTO loginDTO) {
        // Primero, intentamos la verificación del token de Firebase
        if (loginDTO.getTokenFirebase() != null && !loginDTO.getTokenFirebase().isEmpty()) {
            // Llamamos al método de Firebase para verificar el token
            Optional<String> tokenOpt = usuarioService.iniciarSesionConFirebase(loginDTO.getTokenFirebase());

            if (tokenOpt.isPresent()) {
                // Si el token es válido, retornamos un mapa con el JWT generado
                Map<String, String> response = new HashMap<>();
                response.put("token", tokenOpt.get());  // El token JWT generado
                response.put("message", "Inicio de sesión con Firebase exitoso");
                return ResponseEntity.ok(response);
            } else {
                // Si el token de Firebase es inválido o el usuario no existe
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Collections.singletonMap("error", "Token de Firebase inválido o usuario no encontrado"));
            }
        }

        // Si no se proporciona un token de Firebase, verificamos las credenciales tradicionales (username y password)
        Optional<String> tokenOpt = usuarioService.iniciarSesion(loginDTO);

        if (tokenOpt.isPresent()) {
            // Si las credenciales son correctas, retornamos el JWT
            Map<String, String> response = new HashMap<>();
            response.put("token", tokenOpt.get());  // El token JWT generado
            response.put("message", "Inicio de sesión exitoso");
            return ResponseEntity.ok(response);
        }

        // Si las credenciales son incorrectas, se devuelve un error 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("error", "Credenciales incorrectas"));
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);

        request.getSession().invalidate(); // Invalida la sesión del usuario

        return ResponseEntity.ok("Logout exitoso");
    }

    @GetMapping("/check-auth")
    public ResponseEntity<Void> checkAuth(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if (token != null && usuarioService.isValidToken(token.replace("Bearer ", ""))) { // Asegúrate de eliminar el prefijo "Bearer "
            return ResponseEntity.ok().build(); // Usuario autenticado
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // No autenticado
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Endpoint está funcionando");
    }

    @GetMapping("/auth/google")
    public ResponseEntity<String> googleAuth(@RequestParam("code") String code) {
        // Lógica para autenticación con Google
        return ResponseEntity.ok("Autenticación con Google no implementada");
    }

    @GetMapping("/auth/github")
    public ResponseEntity<String> githubAuth(@RequestParam("code") String code) {
        // Lógica para autenticación con GitHub
        return ResponseEntity.ok("Autenticación con GitHub no implementada");
    }
}

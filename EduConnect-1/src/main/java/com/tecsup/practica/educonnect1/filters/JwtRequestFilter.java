package com.tecsup.practica.educonnect1.filters;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        // Si no hay cabecera o no empieza con "Bearer ", ignoramos la solicitud
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            logger.warn("Cabecera Authorization no válida o ausente");
            chain.doFilter(request, response);
            return;
        }

        // Extrae el token de la cabecera Authorization
        String idToken = authorizationHeader.substring(7);

        try {
            // Verifica el token con Firebase
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();

            // Si es necesario cargar más información del usuario desde la base de datos, puedes hacerlo aquí
            // UserDetails userDetails = userDetailsService.loadUserByUsername(uid);

            // Crea un token de autenticación con el UID de Firebase
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    uid, null, null); // No asignamos roles aquí, pero puedes hacerlo si es necesario
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // Establece la autenticación en el contexto de seguridad de Spring
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.info("Usuario autenticado: " + uid);

        } catch (Exception e) {
            // Manejo de errores, por ejemplo, si el token es inválido o ha expirado
            logger.error("Error al procesar el token Firebase: " + e.getMessage());
        }

        // Continúa el filtro para que el request sea procesado
        chain.doFilter(request, response);
    }
}

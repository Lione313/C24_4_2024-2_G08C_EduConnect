package com.tecsup.practica.educonnect1.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    // Generar un token con claims adicionales
    public String generarToken(String username) {
        return Jwts.builder()
                .setSubject(username) // Usar username como Subject
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hora
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // Validar un token
    public boolean validarToken(String token, String username) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();

            // Validar la fecha de expiración y el username
            return claims.getExpiration() != null
                    && claims.getExpiration().after(new Date())
                    && claims.getSubject().equals(username);
        } catch (Exception e) {
            System.err.println("Error al validar el token: " + e.getMessage());
            return false; // Token inválido
        }
    }

    // Obtener el nombre de usuario del token
    public String obtenerUsernameDelToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject(); // Recuperar el username
        } catch (Exception e) {
            System.err.println("Error al obtener el username del token: " + e.getMessage());
            return null;
        }
    }
}

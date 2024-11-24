package com.tecsup.practica.educonnect1.dto;

public class UsuarioLoginDTO {

    private String username;
    private String password;
    private String tokenFirebase; // Campo para almacenar el token de Firebase

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getter y setter para el token de Firebase
    public String getTokenFirebase() {
        return tokenFirebase;
    }

    public void setTokenFirebase(String tokenFirebase) {
        this.tokenFirebase = tokenFirebase;
    }
}

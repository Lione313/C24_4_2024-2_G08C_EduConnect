package com.tecsup.practica.educonnect1.dto;

public class UsuarioRegistroDTO {


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username= username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    private String  password;
    private String  correo;



    private String  username;



}


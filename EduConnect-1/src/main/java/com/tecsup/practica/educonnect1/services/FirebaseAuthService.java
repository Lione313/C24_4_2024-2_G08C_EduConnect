package com.tecsup.practica.educonnect1.services;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.stereotype.Service;

@Service
public class FirebaseAuthService {

    public String verifyIdToken(String idToken) throws Exception {
        // Verifica el token del usuario enviado desde el cliente (React)
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
        String uid = decodedToken.getUid();
        return uid;  // O cualquier otra información que necesites
    }
}

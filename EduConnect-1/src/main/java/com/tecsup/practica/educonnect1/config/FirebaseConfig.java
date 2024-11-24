package com.tecsup.practica.educonnect1.config;



import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.context.annotation.Configuration;
import javax.annotation.PostConstruct;
import java.io.InputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void init() throws IOException {
        // Cargar el archivo JSON desde el classpath (src/main/resources)
        InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("educonnect-38379-firebase-adminsdk-6iawc-89907c177b.json");

        if (serviceAccount == null) {
            throw new IOException("El archivo de credenciales no se encuentra en el classpath.");
        }

        // Configuración de Firebase con el archivo de credenciales
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        // Inicializar Firebase
        FirebaseApp.initializeApp(options);
    }
}

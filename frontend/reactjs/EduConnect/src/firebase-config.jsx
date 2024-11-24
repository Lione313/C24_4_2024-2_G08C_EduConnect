// Importa las funciones necesarias desde Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';



// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAIlN78mUneGsKBOHK3_vmFgzFP04QTZB8",
  authDomain: "educonnect-38379.firebaseapp.com",
  projectId: "educonnect-38379",
  storageBucket: "educonnect-38379.firebasestorage.app",
  messagingSenderId: "358146820702",
  appId: "1:358146820702:web:f23b9941e3ccc18f3602cf",
  measurementId: "G-P8GZ70DZND"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa la autenticación
const auth = getAuth(app);

// Crea los proveedores de Google y GitHub
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Función para iniciar sesión con Google
const handleGoogleLogin = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log("Usuario autenticado con Google:", user);
      // Redirigir al usuario a la página principal
    })
    .catch((error) => {
      console.error("Error en inicio de sesión con Google:", error);
      alert("Hubo un error al iniciar sesión con Google.");
    });
};

// Función para iniciar sesión con GitHub
const handleGitHubLogin = () => {
  signInWithPopup(auth, githubProvider)
    .then((result) => {
      const user = result.user;
      console.log("Usuario autenticado con GitHub:", user);
      // Redirigir al usuario a la página principal
    })
    .catch((error) => {
      console.error("Error en inicio de sesión con GitHub:", error);
      alert("Hubo un error al iniciar sesión con GitHub.");
    });
};

// Exporta las funciones y el objeto necesario
export { auth, handleGoogleLogin, handleGitHubLogin, googleProvider, githubProvider };

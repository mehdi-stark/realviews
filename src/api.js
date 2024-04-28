// api.js
import axios from 'axios';
import router from './router'; // Assurez-vous d'importer votre instance de Vue Router

// Créez une instance Axios avec des options par défaut
const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API, // Remplacez par l'URL de base de votre API
  timeout: 1000,
  headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
});

// Ajoutez un intercepteur de réponse pour gérer les erreurs 401 et 403
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Redirigez vers la page de connexion
      router.push('/login');
      // Supprimez le token du localStorage
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;

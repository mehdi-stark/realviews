// api.js
import axios from 'axios';
import router from './router';

// Fonction pour obtenir le token d'accès stocké
function getAccessToken() {
  return localStorage.getItem('access_token');
}

// Créez une instance Axios avec des options par défaut
const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  // timeout: 1000,
});

// Ajoutez un intercepteur de requête pour ajouter le token d'autorisation avant chaque requête
api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// intercepteur de réponse pour gérer les erreurs 401 et 403
api.interceptors.response.use(
  response => {
    console.log("access token = " + getAccessToken());
    console.log(response);
    return Promise.resolve(response);
  },
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error("Error interceptor access token = " + getAccessToken());

      // Supprimez le token du localStorage
      localStorage.removeItem('access_token');

      console.log("access token after removal = " + getAccessToken());
      // Redirigez vers la page de connexion
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;

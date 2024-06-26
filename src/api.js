// api.js
import axios from 'axios';
import router from './router';
import store from './store/store';

// Fonction pour obtenir le token d'accès stocké
// function getAccessToken() {
//   return localStorage.getItem('access_token');
// }

// Créez une instance Axios avec des options par défaut
const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  // timeout: 1000,
});

// Ajoutez un intercepteur de requête pour ajouter le token d'autorisation avant chaque requête
api.interceptors.request.use(config => {
  // const token = getAccessToken();
  const token = store.state.accessToken;

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
    const token = store.state.accessToken;
    console.log("access token = " + token);
    console.log(response);
    return Promise.resolve(response);
  },
  error => {
    const originalRequest = error.config;
  
    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newAccessToken = store.dispatch('refreshToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        router.push('/login');

        return axios(originalRequest);
      } catch (e) {
        store.dispatch('logout');
        return Promise.reject(e);
      }
    }
    // if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    //   const token = store.state.accessToken;

    //   console.error("Error interceptor access token = " + token);

    //   // Redirigez vers la page de connexion
    //   router.push('/login');

    //   // Supprimez le token du localStorage
    //   store.commit('logout');
    //   console.log("access token after removal = " + store.state.accessToken);
    //   // console.log("error.response.data = " + JSON.stringify(error.response));
      
    //   if (error.response.data.includes('JWT expired')) {
    //     console.log("JWT expired");
    //     // Afficher le dialogue SessionExpiredDialog
    //     store.commit('showSessionExpiredDialog'); 
    //     // this.$refs.sessionExpiredDialog.open();
    //   }
    //   // Retournez une réponse rejetée avec un message d'erreur personnalisé
    //   return Promise.reject('Unauthorized or Forbidden');
    // }
    // return Promise.reject(error);
  }
);

export default api;


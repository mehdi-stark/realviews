import api from '@/api';
import router from '@/router';
import store from '@/store/store';
import axios from 'axios';

export default {

  getSubscriptionPlan(user, accessToken, refreshToken, userData) {
    console.log("Test id " + JSON.stringify(user.id));
    console.log("Access token " + accessToken);
    console.log("Refresh token " + refreshToken);
    axios.get(process.env.VUE_APP_ROOT_API + '/api/v1/subscription-active' + '?userId=' + user.id, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => {
      console.log("Reponse get active subscription ==> " + JSON.stringify(response));
      // Appeler l'action 'login' définie dans le store
      store.dispatch('login', { user: userData, accessToken, refreshToken, subscriptionPlan: response.data});
      router.push("/")
    })
    .catch((error) => {
      console.error("Error get active subscription : " + error);
      this.error = "Erreur lors de la recuperation de la subscription : " + error.data
      this.loading_login = false
      window.location.reload()
    });
  },

  getActiveSubscription(user) {
        console.log('User sidebar  : ' + JSON.stringify(user));
        console.log('User id : ' + JSON.parse(user).id);
          // Code to get the active subscription goes here
          const data = api.get('/api/v1/subscription-active' + '?userId=' + JSON.parse(user).id)
          .then((response) => {
              console.log('Subscription test plan : ' +  response.data.plan);
              return response.data;
          })
          .catch((error) => {
            console.error("Error get active subscription : " + error);
          });

          return data;
      },

    getRemainingProducts() {
        return this.remainingProducts;
    },

    getMaxProducts(subscription) {
        switch (subscription.plan) {
            case 'BASIC' || 'Basic':
              console.log('Plan BASIC');
              return 5;
            case 'STANDARD' || 'Standard':
              console.log('Plan STANDARD');
              return 25;
            case 'PREMIUM' || 'Premium':
              console.log('Plan PREMIUM');
              return 100;
            default:
              console.error('Plan inconnu');
              break;
        }
    },

    getMaxComments(subscription) {
      switch (subscription.plan) {
        case 'BASIC' || 'Basic':
          console.log('Plan BASIC');
          return 25;
        case 'STANDARD' || 'Standard':
          console.log('Plan STANDARD');
          return 100;
        case 'PREMIUM' || 'Premium':
          console.log('Plan PREMIUM');
          return 250;
        default:
          console.error('Invalid subscription plan');
          return 25;
      }
    },

    getActiveSubscriptionFromStore() {
        const subscription = store.state['subscriptionPlan'];
        return subscription ? subscription : null;
    },
}
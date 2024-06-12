import api from '@/api';
import store from '@/store/store';

export default {
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

    getActiveSubscriptionFromStore() {
        const subscription = store.state['subscriptionPlan'];
        return subscription ? subscription : null;
    },
}
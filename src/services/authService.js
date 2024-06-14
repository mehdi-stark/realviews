import axios from "axios";
import subscriptionService from "./subscriptionService";

export default {

  login(form) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_ROOT_API + "/api/auth/login", form)
      .then((response) => {
        console.log('response login -> ' + JSON.stringify(response));
        const reponse_data = response.data;
        const accessToken = reponse_data.access_token;
        const refreshToken = reponse_data.refresh_token;
        const userData = JSON.stringify({
                  id: reponse_data.id,
                  email: reponse_data.email,
                  username: reponse_data.username,
                  role: this.string
          })

          // get subscription
          console.log("Test id " + JSON.stringify(reponse_data.id));
          console.log("Access token " + accessToken);
          subscriptionService.getSubscriptionPlan(reponse_data, accessToken, refreshToken, userData);
      })
      .catch((error) => {
        console.error("Error login : " + error);
        reject("username ou mot de passe invalide");
      });
    }
  )}
}
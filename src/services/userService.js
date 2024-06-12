import router from "@/router";
import store from "@/store/store";

export default {
    checkConnectedUser(userItem) {
        if (userItem) {
            if (userItem.username) {
                return true;
            } else {
              console.error("No username found");
              store.commit('logout'); // Utiliser une mutation pour déconnecter l'utilisateur
              router.push("/login");
              return false;
            }
          } 
          
          else {
            console.error("error user");
            store.commit('logout'); // Utiliser une mutation pour déconnecter l'utilisateur
            router.push("/login");
            return false;
          }
    },

    getUsername(userItem) {
        if(this.checkConnectedUser(userItem))
            return userItem.username;
    }
}
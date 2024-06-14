import router from "@/router";

export default {
  function(current_user, access_token) {
      if (!localStorage.getItem("user") || !localStorage.getItem("access_token")) {
          console.error("user or token not present ! Login is required !");
          router.push("/login");
        } else {
          current_user = JSON.parse(localStorage.getItem("user"));
          access_token = localStorage.getItem("access_token");
    
          console.log(
            "Current user in productlist mounted: " + JSON.stringify(current_user)
          );
          console.log("Current user ID in productlist mounted: " + current_user.id);
          console.log("Current access-token in productlist mounted: " + access_token);
      }
  },
  checkTokenValidity() {
    if (!localStorage.getItem("access_token")) {
      console.error("No token found");
      router.push("/login");
    }
  }

}

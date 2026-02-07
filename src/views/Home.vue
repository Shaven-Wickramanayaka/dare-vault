<script>
import Navbar from "../components/Navbar.vue";
// import firebase from "../firebase/firebase";
// import { getCurrentUser, useFirebaseAuth } from "vuefire";
// import router from "../router";
// let user = await getCurrentUser();
// if (user != null) {
//   router.push("/dashboard");
// }
export default {
  name: "Home",
  components: {
    Navbar,
  },
};
</script>
<template>
  <Navbar></Navbar>
</template>

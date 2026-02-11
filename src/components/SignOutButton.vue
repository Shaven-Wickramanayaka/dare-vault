<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const loggedIn = ref(false);
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedIn.value = true;
    } else {
      loggedIn.value = false;
    }
  });
});
const SignOut = () => {
  signOut(auth).then(() => {
    alert("You have been signed out");
    router.push("/");
  });
};
</script>
<template>
  <button @click="SignOut" v-if="loggedIn">Sign out</button>
</template>

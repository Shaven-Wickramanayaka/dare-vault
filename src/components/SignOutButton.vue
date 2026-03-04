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
  <!-- <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=logout"
  /> -->
  <button
    @click="SignOut"
    v-if="loggedIn"
    class="inline-flex items-center relative border rounded-full hover:shadow-lg py-2 px-3"
  >
    <span class="mdi mdi-logout"></span>
  </button>
  <button
    @click="router.push('/login')"
    v-else
    class="inline-flex items-center relative border rounded-full hover:shadow-lg px-3 py-2 rotate-180"
  >
    <span class="mdi mdi-login"></span>
  </button>
</template>
<style scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
</style>

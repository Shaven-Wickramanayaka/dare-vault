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
  <button
    @click="SignOut"
    v-if="loggedIn"
    class="inline-flex items-center relative border rounded-2xl py-2 px-3 hover:bg-(--color-sage-dark) hover:text-(--color-deep-forest) active:bg-(--color-sage-light)"
  >
    <h4 class="mr-1 items-center">Log Out</h4>
    <span class="mdi mdi-logout"></span>
  </button>
  <button
    @click="router.push('/login')"
    v-else
    class="inline-flex items-center relative border rounded-2xl px-3 py-2 hover:bg-[--color-sage-dark]"
  >
    <h4 class="mr-1 items-center">Log In</h4>

    <span class="mdi mdi-login"></span>
  </button>
</template>
<style scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
</style>

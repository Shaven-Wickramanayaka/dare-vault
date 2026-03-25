<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { collection, addDoc } from "firebase/firestore";
import { useFirestore, useCurrentUser } from "vuefire";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const userEmail = ref("");
const userPassword = ref("");
const router = useRouter();
const errorMessage = ref();
const isLoading = ref(false);
const db = useFirestore();
const emailSignIn = () => {
  isLoading.value = true;
  signInWithEmailAndPassword(getAuth(), userEmail.value, userPassword.value)
    .then(async () => {
      // const user = data.user;
      // await updateProfile(user, {
      //   displayName: user.userName,
      // });
      // await setDoc(doc(db, "users", user.uid), {
      //   name: userName.value,
      //   email: userEmail.value,
      //   createdAt: serverTimestamp(),
      // });
      isLoading.value = false;
      alert("Sign In Succesfull");
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage.value = "Email is Invalid";
          break;
        case "auth/user-not-found":
          errorMessage.value = "No user found. Please sign up";
          break;
        case "auth/wrong-password":
          errorMessage.value = "Incorrect password";
          break;
        case "auth/weak-password":
          errorMessage.value = "Password must be more than 6 characters";
          break;
        default:
          errorMessage.value = "Email or password incorrect";
          break;
      }
    });
  isLoading.value = false;
};
</script>
<template>
  <loading :active="isLoading" :is-full-page="true"></loading>
  <div
    class="flex flex-col justify-center items-center bg-(--color-evergreen) p-3 rounded-xl aspect-2/3 w-60"
  >
    <h1 class="text-3xl mb-3 text-(--color-mint-bright) font-[Pacifico]">
      Sign In
    </h1>
    <label
      for="vault-id"
      class="p-1 font-[Raleway] font-bold tracking-wider text-(--text-on-dark) text-[0.8rem] mt-1.5"
      >Email:
    </label>
    <input
      type="text"
      placeholder="jane.doe@email.com"
      v-model="userEmail"
      class="m1 p-1 border-2 rounded-lg text-(--color-mint-bright)"
    />
    <label
      for="vault-id"
      class="p-1 font-[Raleway] font-bold tracking-wider text-(--text-on-dark) text-[0.8rem] mt-1.5"
      >Password
    </label>
    <input
      type="password"
      placeholder="************"
      v-model="userPassword"
      class="m1 p-1 border-2 rounded-lg text-(--color-mint-bright)"
    />
    <button
      @click="emailSignIn"
      class="p-2 rounded-lg mt-3 font-[Raleway] font-medium bg-(--color-sage-light) hover:bg-(--secondary-accent) text-(--color-deep-forest) cursor-pointer active:bg-(--highlight)"
    >
      Sign In
    </button>
    <p v-if="errorMessage" class="p-3 font-[Raleway] font-bold">
      {{ errorMessage }}
    </p>
  </div>
</template>
<style scoped>
::placeholder {
  font-family: "Raleway";
  text-align: center;
  color: var(--color-sage-light);
}
</style>

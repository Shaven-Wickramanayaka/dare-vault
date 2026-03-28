<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "vuefire";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
const userEmail = ref("");
const userPassword = ref("");
const userName = ref("");
const errorMessage = ref();
const router = useRouter();
const db = useFirestore();
const isLoading = ref(false);

const emailSignIn = () => {
  isLoading.value = true;
  createUserWithEmailAndPassword(getAuth(), userEmail.value, userPassword.value)
    .then(async (data) => {
      const user = data.user;
      await updateProfile(user, {
        displayName: userName.value,
      });

      await setDoc(doc(db, "users", user.uid), {
        name: userName.value,
        email: userEmail.value,
        createdAt: serverTimestamp(),
      });

      alert("Sign up Successful");
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
    class="flex flex-col justify-center items-center bg-(--color-evergreen) p-3 rounded-xl aspect-2/3 w-60 shadow-2xl shadow-[#283929]"
  >
    <h1 class="text-3xl mb-3 font-[Pacifico] text-(--color-mint-bright)">
      Sign Up
    </h1>
    <label
      for="vault-id"
      class="p-1 font-[Raleway] font-bold tracking-wider text-(--text-on-dark) text-[0.8rem] mt-1.5"
      >Display Name:
    </label>
    <input
      type="text"
      placeholder="Jane Doe"
      v-model="userName"
      class="m1 p-1 border-2 rounded-lg text-(--color-mint-bright)"
    />
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
      placeholder="*************"
      v-model="userPassword"
      class="m1 p-1 border-2 rounded-lg text-(--color-mint-bright)"
    />
    <button
      @click="emailSignIn"
      class="p-2 rounded-lg mt-3 font-[Raleway] font-medium bg-(--color-sage-light) hover:bg-(--secondary-accent) text-(--color-deep-forest) cursor-pointer active:bg-(--highlight)"
    >
      Create Account
    </button>
    <label
      for="vault-id"
      class="p-1 font-[Raleway] font-bold tracking-wider text-(--text-on-dark) text-[0.8rem] mt-1.5"
      >{{ errorMessage }}
    </label>
  </div>
</template>
<style scoped>
::placeholder {
  font-family: "Raleway";
  text-align: center;
  color: var(--color-sage-light);
}
</style>

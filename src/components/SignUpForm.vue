<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
const userEmail = ref("");
const userPassword = ref("");
const router = useRouter();
const emailSignIn = () => {
  createUserWithEmailAndPassword(getAuth(), userEmail.value, userPassword.value)
    .then((data) => {
      alert("Sign up Succesfull");
      router.push("/dashboard");
    })
    .catch((error) => {
      console.log(error);
    });
};
const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      router.push("/dashboard");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
<template>
  <h1>Signup</h1>
  <input type="text" placeholder="johndoe@gmail.com" v-model="userEmail" />
  <input type="password" placeholder="Hello" v-model="userPassword" />
  <button @click="emailSignIn">Submit</button>
  <br />
  <button @click="googleSignIn">Sign in with google</button>
</template>

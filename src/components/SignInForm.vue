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
} from "firebase/auth";
const userEmail = ref("");
const userPassword = ref("");
const router = useRouter();
const errorMessage = ref();

const db = useFirestore();
const emailSignIn = () => {
  signInWithEmailAndPassword(getAuth(), userEmail.value, userPassword.value)
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
      alert("Sign up Succesfull");
      router.push("/dashboard");
    })
    .catch((error) => {
      console.log(error);
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage.value = "Email is Invalid";
        case "auth/user-not-found":
          errorMessage.value = "No user found. Please sign up";
        case "auth/wrong-password":
          errorMessage.value = "Incorrect password";
        default:
          errorMessage.value = "Email or password incorrect";
          break;
      }
    });
};
</script>
<template>
  <h1>Signup</h1>
  <input type="text" placeholder="johndoe@gmail.com" v-model="userEmail" />
  <input type="password" placeholder="Hello" v-model="userPassword" />
  <button @click="emailSignIn">Submit</button>
  <p v-if="errorMessage">{{ errorMessage }}</p>
</template>

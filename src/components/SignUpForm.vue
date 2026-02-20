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

const userEmail = ref("");
const userPassword = ref("");
const userName = ref("");

const router = useRouter();
const db = useFirestore();

const emailSignIn = () => {
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
      router.push("/dashboard");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <h1>Signup</h1>
  <input type="text" placeholder="Display Name" v-model="userName" />
  <input type="text" placeholder="johndoe@gmail.com" v-model="userEmail" />
  <input type="password" placeholder="Hello" v-model="userPassword" />
  <button @click="emailSignIn">Submit</button>
</template>

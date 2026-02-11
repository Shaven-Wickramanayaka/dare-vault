<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { collection, addDoc } from "firebase/firestore";
import { useFirestore, useCurrentUser } from "vuefire";

const userEmail = ref("");
const userPassword = ref("");
const router = useRouter();
const errorMessage = ref();

const db = useFirestore();
const emailSignIn = () => {
  signInWithEmailAndPassword(getAuth(), userEmail.value, userPassword.value)
    .then((data) => {
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
const user = useCurrentUser();
try {
  const docRef = await addDoc(collection(db, "users"), {
    Name: user.displayName,
  });
} catch (e) {
  console.log(e);
}
</script>
<template>
  <h1>Signup</h1>
  <input type="text" placeholder="johndoe@gmail.com" v-model="userEmail" />
  <input type="password" placeholder="Hello" v-model="userPassword" />
  <button @click="emailSignIn">Submit</button>
  <p v-if="errorMessage">{{ errorMessage }}</p>
  <br />
  <button @click="googleSignIn">Sign in with google</button>
</template>

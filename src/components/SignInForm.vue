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
  <div
    class="flex flex-col justify-center items-center bg-[#B6D6F2] p-3 rounded-xl"
  >
    <h1 class="text-3xl mb-3 text-[#010A26] font-[Pacifico]">Signup</h1>
    <input
      type="text"
      placeholder="Email"
      v-model="userEmail"
      class="p-2 m-2"
    />
    <input
      type="password"
      placeholder="Password"
      v-model="userPassword"
      class="p-2 m-2"
    />
    <button
      @click="emailSignIn"
      class="p-2 m-2 bg-[#E83338] text-white rounded-lg hover:bg-[#a4262a]"
    >
      Submit
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
  color: #011640;
}
</style>

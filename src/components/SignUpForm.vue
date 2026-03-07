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
  <div
    class="flex flex-col justify-center items-center bg-[#B6D6F2] p-3 rounded-xl"
  >
    <h1 class="text-3xl mb-3 text-[#010A26] font-[Pacifico]">Signup</h1>
    <input
      type="text"
      placeholder="Display Name"
      v-model="userName"
      class="p-2 m-2"
    />
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
  </div>
</template>
<style scoped>
::placeholder {
  font-family: "Raleway";
  text-align: center;
  color: #011640;
}
</style>

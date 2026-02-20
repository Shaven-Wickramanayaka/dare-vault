<script setup>
import Navbar from "../components/Navbar.vue";
import SignUpForm from "../components/SignUpForm.vue";
import SignInForm from "../components/SignInForm.vue";
import { ref } from "vue";
import GoogleSignIn from "../components/GoogleSignIn.vue";
let newUser = ref(true);
const newUserToggle = () => {
  newUser.value = !newUser.value;
};
</script>
<template>
  <SignUpForm v-if="newUser" />
  <SignInForm v-else></SignInForm>
  <GoogleSignIn></GoogleSignIn>
  <button v-if="newUser" @click="newUserToggle">Already have an account</button>
  <button v-else @click="newUserToggle">Already have an account</button>
</template>

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
  <Navbar></Navbar>
  <div class="flex flex-col justify-center items-center h-screen text-center">
    <SignUpForm v-if="newUser" />
    <SignInForm v-else></SignInForm>
    <GoogleSignIn></GoogleSignIn>
    <button
      v-if="newUser"
      @click="newUserToggle"
      class="mt-3 font-[Raleway] font-medium cursor-pointer"
    >
      Already have an account?
    </button>
    <button
      v-else
      @click="newUserToggle"
      class="mt-3 font-[Raleway] font-medium cursor-pointer"
    >
      Just getting Started?
    </button>
  </div>
</template>

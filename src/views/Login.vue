<script setup>
import Navbar from "../components/Navbar.vue";
import SignUpForm from "../components/SignUpForm.vue";
import SignInForm from "../components/SignInForm.vue";
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import GoogleSignIn from "../components/GoogleSignIn.vue";
import Footer from "../components/Footer.vue";
let newUser = ref(true);
const newUserToggle = () => {
  newUser.value = !newUser.value;
};
onMounted(() => {
  // const b1 =
  //   "linear-gradient(217deg, #09100a, #111d13 70.71%),  linear-gradient(127deg, #18291b, #1f3422 70.71%), linear-gradient(336deg, #09100a, #18291b 70.71%)";
  // const b2 =
  //   "linear-gradient(17deg, #18291b, #1f3422 70.71%), linear-gradient(200deg, #09100a, rgba(0,255,0,.2) 70.71%),  linear-gradient(336deg, #18291b, #111d13 70.71%)";
  // //via @jack
  // gsap.fromTo(
  //   "#parent",
  //   { background: b1 },
  //   {
  //     ease: "none",
  //     duration: 12,
  //     background: b2,
  //     repeat: -1,
  //   },
  // );
});
</script>
<template>
  <Navbar></Navbar>
  <div
    class="flex flex-col justify-center items-center h-screen text-center"
    id="parent"
  >
    <SignUpForm v-if="newUser" />
    <SignInForm v-else></SignInForm>
    <GoogleSignIn></GoogleSignIn>
    <button
      v-if="newUser"
      @click="newUserToggle"
      class="mt-3 font-[Raleway] font-medium cursor-pointer text-(--text-on-dark)"
    >
      Already have an account?
    </button>
    <button
      v-else
      @click="newUserToggle"
      class="mt-3 font-[Raleway] font-medium cursor-pointer text-(--text-on-dark)"
    >
      Just getting Started?
    </button>
  </div>
</template>

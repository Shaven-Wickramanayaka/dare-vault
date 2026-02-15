<script>
import Navbar from "../components/Navbar.vue";
import SignInForm from "../components/SignInForm.vue";
import SignUpForm from "../components/SignupForm.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    SignUpForm,
    SignInForm,
  },
};
</script>
<template>
  <SignUpForm />
</template>

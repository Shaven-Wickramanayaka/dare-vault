<script>
import SignInButton from "../components/SignInButton.vue";
import Navbar from "../components/Navbar.vue";
import SignIn from "../components/SignIn.vue";
import SignUpForm from "../components/SignUpForm.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    SignInButton,
    SignUpForm,
  },
};
</script>
<template>
  <SignUpForm />
</template>

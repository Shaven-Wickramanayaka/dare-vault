<script>
import SignOutButton from "./SignOutButton.vue";

export default {
  name: "Navbar",
  components: {
    SignOutButton,
  },
};
</script>
<template>
  <nav class="bg-gray-800 text-white w-full">
    <ul>
      <li>Hello</li>
      <li>World</li>
      <li>Hi</li>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/signup">Sign In</router-link>
      <SignOutButton></SignOutButton>
    </ul>
  </nav>
</template>
<style lang="css" scoped></style>

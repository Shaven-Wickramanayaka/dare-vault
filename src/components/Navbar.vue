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
    <span> <h1 class="text-left p-4">DareVault</h1> </span
    ><span>
      <h1 class="text-right p-4">Log In</h1>
    </span>
  </nav>
</template>
<style lang="css" scoped></style>

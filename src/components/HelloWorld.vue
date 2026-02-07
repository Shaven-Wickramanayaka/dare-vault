<script setup>
import { ref } from "vue";
import Navbar from "./Navbar.vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template></template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

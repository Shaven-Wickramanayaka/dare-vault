<script setup>
import { useCurrentUser, useDocument, useFirestore } from "vuefire";
import { computed } from "vue";
import Dashboard from "../components/Dashboard.vue";
import Home from "../components/Home.vue";
const user = useCurrentUser();

const isLoading = computed(() => user.value === undefined);
const isLoggedIn = computed(() => !!user.value);
</script>
<template>
  <div v-if="isLoading" class="flex justify-center items-center h-screen">
    <p class="font-[Pacifico] text-4xl text-(--text-on-dark)">Loading...</p>
  </div>
  <Dashboard v-else-if="isLoggedIn"></Dashboard>
  <Home v-else></Home>
</template>

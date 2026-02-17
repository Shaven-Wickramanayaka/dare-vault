<script setup>
import { useRoute, useRouter } from "vue-router";
import StartGame from "../components/StartGame.vue";
import AddDare from "../components/AddDare.vue";
const route = useRoute();
const vaultId = route.params.id;
alert(vaultId);
</script>
<template>
  <StartGame :vaultId="vaultId"></StartGame>
  <AddDare :vaultId="vaultId"></AddDare>
</template>

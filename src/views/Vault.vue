<script setup>
import { useRoute, useRouter } from "vue-router";
import DisplayMembers from "../components/DisplayMembers.vue";
import AddDare from "../components/AddDare.vue";

const route = useRoute();
const vaultId = route.params.id;
</script>
<template>
  <DisplayMembers :vaultId="vaultId"></DisplayMembers>
  <AddDare :vaultId="vaultId"></AddDare>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import DisplayMembers from "../components/DisplayMembers.vue";
import AddDare from "../components/AddDare.vue";
import DeleteVault from "../components/DeleteVault.vue";

const route = useRoute();
const vaultId = route.params.id;
</script>
<template>
  <DisplayMembers :vaultId="vaultId"></DisplayMembers>
  <AddDare :vaultId="vaultId"></AddDare>
  <DeleteVault :vaultId="vaultId"></DeleteVault>
</template>

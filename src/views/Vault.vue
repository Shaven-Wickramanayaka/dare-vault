<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import DisplayMembers from "../components/DisplayMembers.vue";
import AddDare from "../components/AddDare.vue";
import DeleteVault from "../components/DeleteVault.vue";
import { doc, getDoc } from "firebase/firestore";
import { useCurrentUser, useFirestore } from "vuefire";
import GetDare from "../components/GetDare.vue";
const route = useRoute();
const vaultId = route.params.id;
const currentUser = useCurrentUser();
const owner = ref(null);
const db = useFirestore();
onMounted(async () => {
  const vault = await getDoc(doc(db, "vaults", vaultId));
  console.log(vault);
  if (vault.exists()) {
    owner.value = vault.data().owner ?? null;
  }
});
const isOwner = computed(
  () => !!currentUser.value && currentUser.value.uid === owner.value,
);
console.log(isOwner);
</script>
<template>
  <DisplayMembers :vaultId="vaultId"></DisplayMembers>
  <AddDare :vaultId="vaultId"></AddDare>
  <!-- TODO: Update security rules to only allow owner to delete and figure out whats wrong with the logic -->
  <DeleteVault v-if="isOwner" :vaultId="vaultId"></DeleteVault>
  <GetDare :vaultId="vaultId"></GetDare>
</template>

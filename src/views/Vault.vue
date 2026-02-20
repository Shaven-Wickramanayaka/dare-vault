<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import DisplayMembers from "../components/DisplayMembers.vue";
import AddDare from "../components/AddDare.vue";
import DeleteVault from "../components/DeleteVault.vue";
import { doc, getDoc } from "firebase/firestore";
import { getCurrentUser, useFirestore } from "vuefire";
const route = useRoute();
const vaultId = route.params.id;
const currentUser = getCurrentUser();
const owner = ref(null);
const db = useFirestore();
onMounted(async () => {
  const vault = await getDoc(doc(db, "vaults", vaultId));
  console.log(vault);
  if (vault.exists()) {
    owner.value = vault.data().owner ?? null;
  }
});
const isOwner = computed(() => owner.value == currentUser.uid);
console.log(isOwner);
</script>
<template>
  <DisplayMembers :vaultId="vaultId"></DisplayMembers>
  <AddDare :vaultId="vaultId"></AddDare>
  <!-- TODO: Update security rules to only allow owner to delete -->
  <DeleteVault v-if="isOwner" :vaultId="vaultId"></DeleteVault>
</template>

<script setup>
import { getCurrentUser, useDocument, useFirestore } from "vuefire";
import { useRouter } from "vue-router";
import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions();
const deleteVaultFull = httpsCallable(functions, "deleteVaultFull");
const props = defineProps({
  vaultId: {
    type: String,
    required: true,
  },
});
const router = useRouter();
const deleteVault = async () => {
  const vaultStatus = await deleteVaultFull({
    vaultId: props.vaultId,
  });
  console.log("deleted");
  console.log(vaultStatus);
  router.push("/dashboard");
  alert("Vault has been deleted");
};
</script>
<template>
  <button @click="deleteVault">Delete This Vault</button>
  <p>This action is irreversible. There is no confirmation screen!</p>
</template>

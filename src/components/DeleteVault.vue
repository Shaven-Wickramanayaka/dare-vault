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
  <div
    class="bg-amber-400 rounded-lg p-2 mt-30 h-30 flex flex-col justify-center items-center"
  >
    <p>This action is irreversible. There is no confirmation screen!</p>
    <button
      class="w-[50%] h-[40%] bg-red-700 p-2 rounded-lg m-3 hover:bg-red-950"
      @click="deleteVault"
    >
      Delete This Vault
    </button>
  </div>
</template>

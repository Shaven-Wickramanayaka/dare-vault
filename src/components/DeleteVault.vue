<script setup>
import { getCurrentUser, useDocument, useFirestore } from "vuefire";
import { useRouter } from "vue-router";
import { getFunctions, httpsCallable } from "firebase/functions";
import { ref } from "vue";
const functions = getFunctions();
const deleteVaultFull = httpsCallable(functions, "deleteVaultFull");
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
let isLoading = ref(false);

const props = defineProps({
  vaultId: {
    type: String,
    required: true,
  },
});
const router = useRouter();
const deleteVault = async () => {
  isLoading.value = true;
  const vaultStatus = await deleteVaultFull({
    vaultId: props.vaultId,
  });
  isLoading.value = false;
  router.push("/dashboard");
  alert("Vault has been deleted");
};
</script>
<template>
  <loading :active="isLoading" :is-full-page="true"></loading>
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

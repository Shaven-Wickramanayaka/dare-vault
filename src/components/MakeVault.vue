<script setup>
import {
  getFirestore,
  serverTimestamp,
  addDoc,
  doc,
  collection,
  updateDoc,
} from "firebase/firestore";

import { getCurrentUser } from "vuefire";
import { ref, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
const vaultName = ref("");
const router = useRouter();
const makeVault = async () => {
  if (vaultName.value == "") {
    alert("Please enter a name for the vault");
    return;
  }
  if (vaultName.value.trim().length === 0) {
    alert("Enter a valid vault name");
    return;
  }
  const db = getFirestore();
  const user = await getCurrentUser();
  let createdVaultID = ref("");
  const newVault = await addDoc(collection(db, "vaults"), {
    name: vaultName.value,
    joinedUsers: {
      [user.uid]: user.displayName,
    },
    createdAt: serverTimestamp(),
    owner: user.uid,
  });
  await updateDoc(doc(db, "users", user.uid), {
    [`joinedVaults.${newVault.id}`]: vaultName.value,
  });
  vaultName.value = "";
  vaultName.placeholder = "Enter Vault Name";
  // router.push("/dashboard");
};
</script>
<template>
  <div class="flex flex-col text-center p-2 justify-around">
    <h2 class="font-[Raleway] text-2xl font-bold p-2">Make a Vault</h2>
    <input
      type="text"
      placeholder="Enter Vault Name"
      v-model="vaultName"
      name="vaultname"
      class="m-2 p-2"
    />
    <button
      @click="makeVault"
      class="p-2 rounded-lg mt-1 font-[Raleway] font-medium bg-red-400 hover:bg-red-500"
    >
      Make a new vault
    </button>
  </div>
</template>
<style scoped>
::placeholder {
  text-align: center;
}
</style>

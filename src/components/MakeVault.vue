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
import { ref } from "vue";
const vaultName = ref("");
const makeVault = async () => {
  const db = getFirestore();
  const user = await getCurrentUser();
  let createdVaultID = ref("");
  const newVault = await addDoc(collection(db, "vaults"), {
    name: vaultName.value,
    users: {
      [user.uid]: user.displayName,
    },
    createdAt: serverTimestamp(),
  });
  await updateDoc(doc(db, "users", user.uid), {
    [`joinedVaults.${newVault.id}`]: vaultName.value,
  });
};
</script>
<template>
  <input type="text" placeholder="Enter Vault Name" v-model="vaultName" />
  <button @click="makeVault">Make a new vault</button>
</template>

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
const vaultName = ref("");
const form = useTemplateRef("form");
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
};
</script>
<template>
  <div>
    <input
      type="text"
      placeholder="Enter Vault Name"
      v-model="vaultName"
      name="vaultname"
    />
    <button @click="makeVault">Make a new vault</button>
  </div>
</template>

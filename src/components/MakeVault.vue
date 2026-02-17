<script setup>
import { getFirestore, serverTimestamp, setDoc, doc } from "firebase/firestore";

import { getCurrentUser } from "vuefire";
import { ref } from "vue";

const vaultName = ref("");

const makeVault = async () => {
  const db = getFirestore();
  const user = await getCurrentUser();
  await setDoc(doc(db, "vaults", user.uid), {
    name: vaultName.value,
    users: {
      [user.uid]: user.displayName,
    },
    createdAt: serverTimestamp(),
  });
};
</script>
<template>
  <input type="text" placeholder="Enter Vault Name" v-model="vaultName" />
  <button @click="makeVault">Make a new vault</button>
</template>

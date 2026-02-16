<script setup>
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref } from "vue";
import { getCurrentUser } from "vuefire";

const vaultID = ref("");
const expectedVaultName = ref("");

const addVault = async () => {
  const db = getFirestore();
  const vaultRef = doc(db, "vaults", vaultID.value);
  const vaultSnap = await getDoc(vaultRef);
  if (!vaultSnap.exists()) {
    alert("No vault exists");
    return;
  }
  const actualVaultName = vaultSnap.data().Name;
  if (actualVaultName !== expectedVaultName.value) {
    alert("Vault name does not match");
    return;
  }
  const user = await getCurrentUser();
  const userDocRef = doc(db, "users", user.uid);

  await updateDoc(userDocRef, {
    [`joinedVaults.${vaultID.value}`]: expectedVaultName.value,
  });
  alert("Vault added successfully");
};
</script>

<template>
  <input type="text" placeholder="Vault Id" v-model="vaultID" />
  <input type="text" placeholder="Vault Name" v-model="expectedVaultName" />
  <button @click="addVault">Submit</button>
</template>

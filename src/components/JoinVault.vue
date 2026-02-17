<script setup>
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getCurrentUser } from "vuefire";

const vaultId = ref("");
const expectedVaultName = ref("");
const router = useRouter();
const addVault = async () => {
  const db = getFirestore();
  const vaultRef = doc(db, "vaults", vaultId.value);
  const vaultSnap = await getDoc(vaultRef);
  if (!vaultSnap.exists()) {
    alert("No vault exists");
    return;
  }
  const actualVaultName = vaultSnap.data().Name;
  if (actualVaultName !== expectedVaultName.value) {
    alert("Vault name doesnt match");
    return;
  }
  const user = await getCurrentUser();
  const userDocRef = doc(db, "users", user.uid);
  const vaultDocRef = doc(db, "vaults", vaultId.value);

  await updateDoc(userDocRef, {
    [`joinedVaults.${vaultId.value}`]: expectedVaultName.value,
  });
  await updateDoc(vaultDocRef, {
    [`joinedUsers.${user.uid}`]: user.displayName,
  });
  router.push("/dashboard");
};
</script>

<template>
  <input type="text" placeholder="Vault Id" v-model="vaultId" />
  <input type="text" placeholder="Vault Name" v-model="expectedVaultName" />
  <button @click="addVault">Join a vault</button>
</template>

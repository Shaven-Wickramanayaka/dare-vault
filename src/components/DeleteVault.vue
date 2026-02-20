<script setup>
import { ref } from "vue";
import {
  serverTimestamp,
  addDoc,
  collection,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  deleteField,
} from "firebase/firestore";
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
  // const db = useFirestore();
  // const vaultRef = doc(db, "vaults", props.vaultId);
  // const vaultSnap = await getDoc(vaultRef);
  // const vault = vaultSnap.data();
  // const users = vault?.joinedUsers ?? {};
  // console.log(users);
  // await Promise.all(
  //   Object.keys(users).map((key) => {
  //     console.log(key);
  //     const userRef = doc(db, "users", key);
  //     return updateDoc(userRef, {
  //       [`joinedVaults.${props.vaultId}`]: deleteField(),
  //     });
  //   }),
  // );
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

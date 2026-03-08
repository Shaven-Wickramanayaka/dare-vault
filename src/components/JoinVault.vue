<script setup>
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
import { getCurrentUser } from "vuefire";

const vaultId = ref("");
const expectedVaultName = ref("");
const router = useRouter();
const form = useTemplateRef("form");
const addVault = async () => {
  if (expectedVaultName.value == "" || vaultId.value == "") {
    alert("Please enter both a vault id and a vault name");
    return;
  }
  if (
    expectedVaultName.value.trim().length === 0 ||
    vaultId.value.trim().length === 0
  ) {
    alert("Enter a valid vault name and vault id");
    return;
  }
  const db = getFirestore();
  const vaultRef = doc(db, "vaults", vaultId.value);
  const vaultSnap = await getDoc(vaultRef);
  if (!vaultSnap.exists()) {
    alert("No vault exists");
    return;
  }

  const actualVaultName = vaultSnap.data().name;
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
  expectedVaultName.value = "";
  expectedVaultName.placeholder = "Vault Name";
  vaultId.value = "";
  vaultId.placeholder = "Vault ID";
};
</script>
<template>
  <div class="flex flex-col text-center p-2 justify-around">
    <h2 class="font-[Raleway] text-2xl font-bold p-2">Join a Vault</h2>
    <input
      type="text"
      placeholder="Vault Id"
      v-model="vaultId"
      class="m-1 p-1"
    />
    <input
      type="text"
      placeholder="Vault Name"
      v-model="expectedVaultName"
      name="vaultname"
      class="m1 p-1"
    />
    <button
      @click="addVault"
      class="p-2 rounded-lg mt-1.5 font-[Raleway] font-medium bg-[#E83338] hover:bg-[#bc2b30] text-white"
    >
      Search and Add
    </button>
  </div>
</template>
<style scoped>
::placeholder {
  text-align: center;
}
</style>

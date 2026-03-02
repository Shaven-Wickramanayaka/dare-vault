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
  // Always clears for some reason
  form.reset();
};
</script>
<template>
  <div class="p-2 w-[50%]">
    <form
      ref="form"
      onsubmit="
        if (/\s/.test(this.vaultname.value)) {
          alert('No spaces allowed');
          return false;
        }
      "
    >
      <input type="text" placeholder="Vault Id" v-model="vaultId" />
      <input
        type="text"
        placeholder="Vault Name"
        v-model="expectedVaultName"
        name="vaultname"
      />
      <button @click="addVault">Join a vault</button>
    </form>
  </div>
</template>

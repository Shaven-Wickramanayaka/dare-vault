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
  <div class="flex flex-col text-center p-2 justify-around items-center">
    <h2
      class="font-[Raleway] text-2xl font-bold p-2 text-(--text-on-dark) mb-1.5"
    >
      Make a Vault
    </h2>
    <div class="flex flex-col">
      <label
        for="vault-name"
        class="p-1 font-[Raleway] font-bold tracking-wider text-(--text-on-dark) text-[0.8rem]"
        >Vault Name:
      </label>
      <input
        type="text"
        placeholder="Enter Vault Name"
        v-model="vaultName"
        name="vault-name"
        class="m1 p-1 border-2 rounded-lg text-(--color-mint-bright)"
      />
      <button
        @click="makeVault"
        class="p-2 rounded-lg mt-2.5 font-[Raleway] cursor-pointer font-medium bg-(--color-sage-light) hover:bg-(--secondary-accent) text-(--color-deep-forest) active:bg-(--highlight)"
      >
        Make a new vault
      </button>
    </div>

    <legend
      class="mt-4 text-[0.8rem] text-center text-(--text-on-dark) font-[Raleway] font-bold tracking-wider"
    >
      Tip: After creating a vault, it will appear in your list of vaults. Click
      on the name of the vault to enter
    </legend>
  </div>
</template>
<style scoped>
::placeholder {
  text-align: center;
}
</style>

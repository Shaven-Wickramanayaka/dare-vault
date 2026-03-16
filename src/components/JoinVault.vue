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
  <div class="flex flex-col text-center p-2 justify-between">
    <h2
      class="font-[Raleway] text-2xl font-bold p-2 text-(--text-on-dark) mb-1.5"
    >
      Join a Vault
    </h2>
    <div class="flex items-center flex-col justify-between">
      <label
        for="vault-name"
        class="p-1 font-[Raleway] font-bold tracking-wider text-(--text-on-dark) text-[0.8rem]"
        >Vault Name:
      </label>
      <input
        type="text"
        placeholder="Very Cool Vault"
        v-model="expectedVaultName"
        name="vault-name"
        class="m1 p-1 border-2 rounded-lg text-(--color-mint-bright)"
      />
      <label
        for="vault-id"
        class="p-1 font-[Raleway] font-bold tracking-wider text-(--text-on-dark) text-[0.8rem]"
        >Vault ID:
      </label>
      <input
        name="vault-id"
        type="text"
        placeholder="EmllRVwPBY4iHaeMfYQ6"
        v-model="vaultId"
        class="m-1 p-1 border-2 rounded-lg text-(--color-mint-bright)"
      />
    </div>
    <div class="flex items-center justify-between"></div>

    <button
      @click="addVault"
      class="p-2 rounded-lg mt-2.5 font-[Raleway] font-medium bg-(--color-sage-light) hover:bg-(--secondary-accent) text-(--color-deep-forest) active:bg-(--highlight)"
    >
      Search and Add
    </button>
  </div>
</template>
<style scoped>
::placeholder {
  text-align: center;
  color: var(--color-sage-light);
}
</style>

<script setup>
import { useCurrentUser, useDocument, useFirestore } from "vuefire";
import { doc } from "firebase/firestore";
import JoinVault from "../components/JoinVault.vue";
import MakeVault from "../components/MakeVault.vue";
import Navbar from "../components/Navbar.vue";
import { computed } from "vue";

const db = useFirestore();
const user = useCurrentUser();

const userRef = doc(db, "users", user.value.uid);
const userData = useDocument(userRef);
const vaultsJoined = computed(
  () => Object.keys(userData.value?.joinedVaults ?? {}).length,
);
const noVaults = computed(() => vaultsJoined.value === 0);
</script>
<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl my-3 w-fit font-[Pacifico] text-red-300 p-3">
      Hello {{ user.displayName }}
    </h1>
    <div
      class="p-5 flex flex-col items-center justify-center text-center w-[80%] m-3"
    >
      <h2 class="font-[Raleway] text-2xl font-bold">Vaults</h2>
      <h3 v-if="noVaults" class="p-2 mt-2 font-[Raleway] font-">
        You have no vaults. Join or make a vault
      </h3>
      <ul v-else class="p-2">
        <li
          v-for="(vaultName, vaultId) in userData?.joinedVaults"
          :key="vaultId"
        >
          <a :href="'/vaults/' + vaultId">
            <p>{{ vaultName }}</p>
          </a>
        </li>
      </ul>
    </div>

    <JoinVault />
    <MakeVault />
  </div>
</template>

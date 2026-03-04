<script setup>
import { useCurrentUser, useDocument, useFirestore } from "vuefire";
import { doc } from "firebase/firestore";
import JoinVault from "../components/JoinVault.vue";
import MakeVault from "../components/MakeVault.vue";
import Navbar from "../components/Navbar.vue";
import { computed, ref } from "vue";

const db = useFirestore();
const user = useCurrentUser();
const joinVault = ref(true);
const makeVault = ref(false);
const listVaults = ref(false);
const userRef = doc(db, "users", user.value.uid);
const userData = useDocument(userRef);
const vaultsJoined = computed(
  () => Object.keys(userData.value?.joinedVaults ?? {}).length,
);
const noVaults = computed(() => vaultsJoined.value === 0);
const toggleJoinVaults = () => {
  joinVault.value = true;
  makeVault.value = false;
  listVaults.value = false;
};
const toggleMakeVaults = () => {
  joinVault.value = false;
  makeVault.value = true;
  listVaults.value = false;
};
const toggleListVaults = () => {
  joinVault.value = false;
  makeVault.value = false;
  listVaults.value = true;
};
</script>
<template>
  <!-- <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=add_notes"
  /> -->
  <div class="flex flex-col items-center">
    <h1 class="text-3xl my-3 w-fit font-[Pacifico] text-red-300 p-3">
      Hello {{ user.displayName }}
    </h1>
    <!-- <div
      class="p-5 flex flex-col items-center justify-center text-center w-[80%] m-3"
    ></div> -->
    <div class="bg-gray-400 w-[60%] flex justify-around rounded-xl">
      <span
        class="mdi mdi-note-plus text-[5vh] md:text-[6vh]"
        @click="toggleJoinVaults"
      ></span>
      <span
        class="mdi mdi-magnify text-[5vh] md:text-[6vh]"
        @click="toggleMakeVaults"
      ></span>
      <span
        class="mdi mdi-sort text-[5vh] md:text-[6vh]"
        @click="toggleListVaults"
      ></span>
    </div>
    <JoinVault v-show="joinVault" />
    <MakeVault v-show="makeVault" />
    <div v-show="listVaults">
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
  </div>
</template>

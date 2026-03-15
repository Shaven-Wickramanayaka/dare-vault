<script setup>
import { useCurrentUser, useDocument, useFirestore } from "vuefire";
import { doc } from "firebase/firestore";
import JoinVault from "../components/JoinVault.vue";
import MakeVault from "../components/MakeVault.vue";
import Navbar from "../components/Navbar.vue";
import { computed, ref } from "vue";
import Footer from "../components/Footer.vue";

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
  <nav
    class="flex flex-row h-11.25 items-center bg-(--background-dark) justify-between"
  >
    <h1
      class="ml-6 mt-5 text-[1.3rem] font-[Pacifico] text-(--secondary-accent) justify-self-start"
    >
      Hello {{ user.displayName }}
    </h1>
    <div class="mr-3">
      <!-- <span
        class="mdi mdi-magnify text-[1.5rem] bg-[#B6D6F2] text-[#E83338] rounded-4xl px-1 mx-1"
      ></span>
      <span
        class="mdi mdi-note-plus text-[1.5rem] bg-[#B6D6F2] text-[#E83338] rounded-4xl px-1 mx-1"
      ></span>
      <span
        class="mdi mdi-sort text-[1.5rem] bg-[#B6D6F2] text-[#E83338] rounded-4xl px-1 mx-1"
      ></span> -->
    </div>
  </nav>
  <div class="flex flex-col bg-(--background-dark)">
    <div
      class="bg-(--primary-accent) h-30 aspect-3/2 m-6 rounded-2xl flex justify-around items-center"
    >
      <div class="flex flex-col justify-center">
        <span
          class="mdi mdi-magnify text-[5vh] md:text-[6vh] flex flex-col text-center text-(--background-light)"
          @click="toggleJoinVaults"
        >
        </span>
        <legend
          class="text-[1rem] text-(--background-light) font-[Raleway] font-bold tracking-wide"
        >
          Join vault
        </legend>
      </div>
      <div class="flex flex-col justify-center">
        <span
          class="mdi mdi-note-plus text-[5vh] md:text-[6vh] text-center text-(--highlight)"
          @click="toggleMakeVaults"
        ></span>
        <legend
          class="text-[1rem] text-(--background-light) font-[Raleway] font-bold tracking-wide"
        >
          Make vault
        </legend>
      </div>
      <div class="flex flex-col justify-center">
        <span
          class="mdi mdi-sort text-[5vh] md:text-[6vh] text-center text-(--background-light)"
          @click="toggleListVaults"
        ></span>
        <legend
          class="text-[1rem] text-(--background-light) font-[Raleway] font-bold tracking-wide"
        >
          List vaults
        </legend>
      </div>
    </div>
    <div></div>
  </div>
  <div
    class="flex flex-col items-center justify-center md:h-screen h-201 text-center bg-amber-50"
  >
    <h1
      class="text-3xl my-3 w-fit font-[Pacifico] text-[#010A26] p-3 text-center"
    >
      Hello {{ user.displayName }}
    </h1>
    <!-- <div
      class="p-5 flex flex-col items-center justify-center text-center w-[80%] m-3"
    ></div> -->
    <div class="w-[70%] flex justify-around rounded-xl p-2">
      <span
        class="mdi mdi-magnify text-[5vh] md:text-[6vh]"
        @click="toggleJoinVaults"
      ></span>
      <span
        class="mdi mdi-note-plus text-[5vh] md:text-[6vh]"
        @click="toggleMakeVaults"
      ></span>
      <span
        class="mdi mdi-sort text-[5vh] md:text-[6vh]"
        @click="toggleListVaults"
      ></span>
    </div>
    <JoinVault v-show="joinVault" />
    <MakeVault v-show="makeVault" />
    <div
      v-show="listVaults"
      class="flex flex-col text-center p-2 justify-around"
    >
      <h2 class="font-[Raleway] text-2xl font-bold p-2 text-[#010A26]">
        Vaults
      </h2>
      <h3
        v-if="noVaults"
        class="p-2 mt-2 font-[Raleway] font-bold text-[#E83338]"
      >
        You have no vaults. Join or make a vault
      </h3>
      <ul v-else class="p-2 mb-0.5 font-[Raleway] text-lg font-medium">
        <li
          v-for="(vaultName, vaultId) in userData?.joinedVaults"
          :key="vaultId"
          class="cursor-pointer"
        >
          <a :href="'/vaults/' + vaultId">
            <p>{{ vaultName }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <Footer></Footer>
</template>

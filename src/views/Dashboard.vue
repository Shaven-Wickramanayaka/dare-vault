<script setup>
import { useCurrentUser, useDocument, useFirestore } from "vuefire";
import { doc } from "firebase/firestore";
import JoinVault from "../components/JoinVault.vue";
import MakeVault from "../components/MakeVault.vue";
import Navbar from "../components/Navbar.vue";
import { computed, ref } from "vue";
import Footer from "../components/Footer.vue";
import SignOutButton from "../components/SignOutButton.vue";

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
<template class="bg-(--color-deep-forest)">
  <nav
    class="flex flex-row h-11.25 items-center bg-(--color-deep-forest) justify-between"
  >
    <h1
      class="ml-6 mt-5 text-[1.3rem] font-[Pacifico] text-(--color-mint-bright) justify-self-start"
    >
      Hello {{ user.displayName }}
    </h1>
    <div class="mr-6 mt-5 text-(--color-mint-bright)">
      <SignOutButton></SignOutButton>
    </div>
  </nav>
  <div class="flex flex-col bg-(--color-deep-forest) h-fit">
    <div
      class="bg-(--color-evergreen) h-30 aspect-3/2 m-6 rounded-2xl flex justify-around items-center"
    >
      <div
        class="flex flex-col justify-center hover:cursor-pointer"
        @click="toggleJoinVaults"
        :class="{
          'text-(--secondary-accent)': joinVault,
          'text-(--text-on-dark)': !joinVault,
        }"
      >
        <span
          class="mdi mdi-magnify text-[5vh] md:text-[6vh] flex flex-col text-center"
        >
        </span>
        <legend class="text-[1rem] font-[Raleway] font-bold tracking-wide">
          Join vault
        </legend>
      </div>
      <div
        class="flex flex-col justify-center hover:cursor-pointer"
        @click="toggleMakeVaults"
        :class="{
          'text-(--secondary-accent)': makeVault,
          'text-(--text-on-dark)': !makeVault,
        }"
      >
        <span
          class="mdi mdi-note-plus text-[5vh] md:text-[6vh] text-center"
        ></span>
        <legend class="text-[1rem] font-[Raleway] font-bold tracking-wide">
          Make vault
        </legend>
      </div>
      <div
        class="flex flex-col justify-center hover:cursor-pointer"
        @click="toggleListVaults"
        :class="{
          'text-(--secondary-accent)': listVaults,
          'text-(--text-on-dark)': !listVaults,
        }"
      >
        <span class="mdi mdi-sort text-[5vh] md:text-[6vh] text-center"></span>
        <legend class="text-[1rem] font-[Raleway] font-bold tracking-wide">
          List vaults
        </legend>
      </div>
    </div>
    <div
      class="bg-(--color-evergreen) h-70 aspect-3/2 m-6 rounded-2xl flex justify-around items-center"
    >
      <JoinVault v-show="joinVault" />
      <MakeVault v-show="makeVault" />
      <div
        v-show="listVaults"
        class="flex flex-col text-center p-2 justify-around"
      >
        <h2 class="m-0 font-[Raleway] text-2xl font-bold text-(--text-on-dark)">
          Vaults
        </h2>
        <legend
          class="mb-1.5 text-[0.8rem] text-center text-(--text-on-dark) font-[Raleway] font-bold tracking-wider"
        >
          Click on a vault name to open
        </legend>

        <div class="h-50 overflow-y-scroll overflow-x-hidden">
          <h3
            v-if="noVaults"
            class="p-2 mt-2 font-[Raleway] font-bold text-(--primary-accent)"
          >
            You have no vaults. Join or make a vault
          </h3>
          <ul
            v-else
            class="p-2 mb-0.5 font-[Raleway] text-[1.4rem] font-medium"
          >
            <li
              v-for="(vaultName, vaultId) in userData?.joinedVaults"
              :key="vaultId"
              class="cursor-pointer text-(--secondary-accent) hover:text-(--highlight) py-2 mx-auto"
            >
              <a :href="'/vaults/' + vaultId">
                <p>{{ vaultName }}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- <div
    class="flex flex-col items-center justify-center md:h-screen h-201 text-center bg-amber-50"
  >
    <h1
      class="text-3xl my-3 w-fit font-[Pacifico] text-[#010A26] p-3 text-center"
    >
      Hello {{ user.displayName }}
    </h1>
    <!-- <div
      class="p-5 flex flex-col items-center justify-center text-center w-[80%] m-3"
    ></div>
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
  </div> -->
</template>
<style scoped>
.selected {
  color: black;
}
::-webkit-scrollbar {
  width: 11px;
}

::-webkit-scrollbar-track {
  background: var(--color-deep-forest);
}

::-webkit-scrollbar-thumb {
  background: var(--color-sage-dark);
  border-radius: 5%;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-sage-light);
}
</style>

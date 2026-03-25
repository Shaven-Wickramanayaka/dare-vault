<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import DisplayMembers from "../components/DisplayMembers.vue";
import AddDare from "../components/AddDare.vue";
import DeleteVault from "../components/DeleteVault.vue";
import { doc, getDoc } from "firebase/firestore";
import { useCurrentUser, useFirestore, useDocument } from "vuefire";
import GetDare from "../components/GetDare.vue";
import Navbar from "../components/Navbar.vue";
const route = useRoute();
const router = useRouter();
const vaultId = route.params.id;
const currentUser = useCurrentUser();
const owner = ref(null);
const db = useFirestore();
const vaultRef = doc(db, "vaults", vaultId);
const vaultReactive = useDocument(vaultRef);

onMounted(async () => {
  const vault = await getDoc(vaultRef);
  console.log(vault);
  if (vault.exists()) {
    owner.value = vault.data().owner ?? null;
  }
});
const isOwner = computed(
  () => !!currentUser.value && currentUser.value.uid === owner.value,
);
const users = ref(true);
const addDare = ref(false);
const share = ref(false);
const settingsOpen = ref(false);
const startSessionClicked = ref(false);
const players = ref([]);
const toggleUsers = () => {
  users.value = true;
  addDare.value = false;
  share.value = false;
};
const toggleAddDare = () => {
  users.value = false;
  addDare.value = true;
  share.value = false;
};
const toggleShare = () => {
  users.value = false;
  addDare.value = false;
  share.value = true;
};
const sendPlayers = () => {
  if (players.value.length >= 0) {
    console.log(players.value);
    sessionStorage.setItem("players", JSON.stringify(players.value));
    router.push("/session/" + vaultId);
  } else {
    alert("Please select at least 2 players");
  }
};
</script>
<template>
  <div
    class="bg-[#12121297] h-screen w-screen z-10 absolute m-0 p-0 flex justify-center items-center"
    v-if="settingsOpen || startSessionClicked"
  >
    <div
      class="bg-(--color-evergreen) w-80 aspect-3/2 p-6 rounded-2xl"
      v-if="settingsOpen"
    >
      <div class="flex justify-between">
        <h2
          class="text-2xl text-center font-medium font-[Raleway] text-(--text-on-dark)"
        >
          Settings
        </h2>
        <span
          class="mdi mdi-close-circle text-[1.8rem] text-(--secondary-accent) cursor-pointer"
          @click="settingsOpen = false"
        ></span>
      </div>

      <DeleteVault v-if="isOwner" :vaultId="vaultId"></DeleteVault>
      <div v-else class="p-1 font-[Raleway] font-bold text-(--text-on-dark)">
        Only the owner can edit this vault
      </div>
    </div>
    <div
      class="bg-(--color-evergreen) w-80 aspect-3/2 p-6 rounded-2xl"
      v-if="startSessionClicked"
    >
      <div class="flex justify-between">
        <h2
          class="text-2xl text-center font-medium font-[Raleway] text-(--text-on-dark)"
        >
          Who's Playing?
        </h2>

        <span
          class="mdi mdi-close-circle text-[1.8rem] text-(--secondary-accent) cursor-pointer"
          @click="startSessionClicked = false"
        ></span>
      </div>

      <div class="flex justify-center flex-col">
        <label
          v-for="(userDisplayname, userId) in vaultReactive?.joinedUsers"
          :key="userId"
          class="flex items-center gap-2 py-1 font-[Raleway] font-medium text-(--text-on-dark) cursor-pointer"
        >
          <input
            type="checkbox"
            :value="userDisplayname"
            v-model="players"
            class="accent-[--text-on-dark]"
          />
          <span>{{ userDisplayname }}</span>
        </label>

        <button
          class="p-2 rounded-lg mt-2.5 font-[Raleway] font-medium bg-(--color-sage-light) hover:bg-(--secondary-accent) text-(--color-deep-forest) active:bg-(--highlight) cursor-pointer"
          @click="sendPlayers"
        >
          Start Session
        </button>
      </div>
    </div>
  </div>
  <nav
    class="flex flex-row h-11.25 items-center bg-(--color-deep-forest) justify-between mt-3"
  >
    <h1
      class="ml-6 mt-5 text-2xl lg:text-3xl font-[Pacifico] text-(--color-mint-bright) justify-self-start tracking-wider cursor-pointer"
      @click="router.push('/dashboard')"
    >
      <!--  -->
      {{ vaultReactive.name }}
    </h1>
    <button
      v-if="isOwner"
      @click="settingsOpen = true"
      class="inline-flex items-center relative hover:bg-[--color-sage-dark] mr-6 mt-5 cursor-pointer"
    >
      <span class="mdi mdi-cog text-[1.8rem] text-(--color-mint-bright)"></span>
    </button>
  </nav>
  <div class="flex flex-col md:flex-row justify-around">
    <AddDare :vaultId="vaultId"></AddDare>
    <div
      class="grid grid-cols-2 grid-rows-4 gap-3 bg-(--color-evergreen) h-80 aspect-3/2 mt-6 mx-6 p-6 rounded-2xl"
    >
      <div
        class="col-span-1 row-span-4 bg-(--color-sage-dark) rounded-tl-2xl rounded-bl-2xl"
      >
        <DisplayMembers :vaultId="vaultId"></DisplayMembers>
      </div>
      <div class="col-span-1 row-span-3 bg-(--color-sage-dark) rounded-tr-2xl">
        <legend
          class="p-1 font-[Raleway] font-bold tracking-wider text-(--color-deep-forest) text-[0.8rem]"
        >
          Vault Name
        </legend>
        <h3
          class="px-1 font-[Raleway] font-medium tracking-wide text-(--text-on-dark) text-[0.8rem] md:text-[0.95rem]"
        >
          {{ vaultReactive.name }}
        </h3>
        <legend
          class="p-1 font-[Raleway] font-bold tracking-wider text-(--color-deep-forest) text-[0.8rem]"
        >
          Vault ID
        </legend>
        <h3
          class="px-1 font-[Raleway] font-medium tracking-wide text-(--text-on-dark) text-[0.6rem] md:text-[0.95rem]"
        >
          {{ vaultId }}
        </h3>
        <legend
          class="p-1 mt-3 text-[0.7rem] text-(--text-on-dark) font-[Raleway] font-bold tracking-wider"
        >
          Tip: Send the Vault ID and Name to invite people to this vault
        </legend>
      </div>
      <button
        class="col-span-1 row-span-1 bg-(--secondary-accent) cursor-pointer rounded-br-2xl flex items-center justify-center hover:bg-(--highlight)"
      >
        <h3
          class="font-[Pacifico] text-[1rem] md:text-[1.4rem] text-(--color-deep-forest)"
          @click="startSessionClicked = true"
        >
          Start Session
        </h3>
      </button>
    </div>
  </div>
</template>
<style scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

::-webkit-scrollbar {
  width: 11px;
}

::-webkit-scrollbar-track {
  border-radius: 10px !important;
}

::-webkit-scrollbar-thumb {
  background: var(--color-deep-forest);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #1e3321;
}
</style>

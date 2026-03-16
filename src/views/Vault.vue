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
console.log(isOwner);
</script>
<template>
  <nav
    class="flex flex-row h-11.25 items-center bg-(--color-deep-forest) justify-between mt-3"
  >
    <h1
      class="ml-6 mt-5 text-[1.3rem] font-[Pacifico] text-(--color-mint-bright) justify-self-start tracking-wider"
    >
      <!--  -->
      {{ vaultReactive.name }}
    </h1>
    <button
      v-if="isOwner"
      @click="router.push('/login')"
      class="inline-flex items-center relative hover:bg-[--color-sage-dark] mr-6 mt-5"
    >
      <span class="mdi mdi-cog text-[1.8rem] text-(--color-mint-bright)"></span>
    </button>
  </nav>
  <div class="flex flex-col md:flex-row justify-around items-center">
    <AddDare :vaultId="vaultId"></AddDare>
    <div
      class="grid grid-cols-2 grid-rows-4 gap-3 bg-(--color-evergreen) h-80 aspect-3/2 m-6 p-6 rounded-2xl"
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
          Vault ID
        </legend>
        <h3
          class="px-1 font-[Raleway] font-medium tracking-wide text-(--text-on-dark) text-[0.7rem] md:text-[0.95rem]"
        >
          {{ vaultId }}
        </h3>
        <legend
          class="p-1 font-[Raleway] font-bold tracking-wider text-(--color-deep-forest) text-[0.8rem]"
        >
          Vault ID
        </legend>
        <h3
          class="px-1 font-[Raleway] font-medium text-(--text-on-dark) text-[0.5rem] md:text-[0.95rem]"
        >
          {{ vaultReactive.name }}
        </h3>
        <legend
          class="p-1 mt-3 text-[0.7rem] text-(--text-on-dark) font-[Raleway] font-bold tracking-wider"
        >
          Tip: Send the Vault ID and Name to invite people to this vault
        </legend>
      </div>
      <div
        class="col-span-1 row-span-1 bg-(--highlight) rounded-br-2xl flex items-center justify-center"
      >
        <button>
          <h3>Start Session</h3>
        </button>
      </div>
    </div>
  </div>
  <!-- 
  <div class="flex flex-col items-center bg-amber-50">
    <h1
      class="p-2 m-2 text-2xl md:text-3xl cursor-pointer font-[Pacifico] text-[#010A26]"
      @click="router.push('/dashboard')"
    ></h1>
    <GetDare :vaultId="vaultId"></GetDare>
    <div class="w-[60vw] flex justify-around rounded-xl">
      <span
        class="mdi mdi-account text-[5vh] md:text-[6vh]"
        @click="toggleUsers"
      ></span>
      <span
        class="mdi mdi-plus-circle text-[5vh] md:text-[6vh]"
        @click="toggleAddDare"
      ></span>
      <span
        class="mdi mdi-share text-[5vh] md:text-[6vh]"
        @click="toggleShare"
      ></span>
    </div>
    <div v-show="users"></div>

    <div v-show="addDare">
      <AddDare :vaultId="vaultId"></AddDare>
    </div>

    <!-- TODO: Update security rules to only allow owner to delete
    <DeleteVault v-if="isOwner" :vaultId="vaultId"></DeleteVault>
  </div> -->
</template>
<style scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
</style>

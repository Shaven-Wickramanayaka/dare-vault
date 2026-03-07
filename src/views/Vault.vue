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
  <Navbar></Navbar>
  <div class="flex flex-col items-center">
    <h1
      class="p-2 m-2 text-2xl cursor-pointer font-[Pacifico] text-red-300"
      @click="router.push('/dashboard')"
    >
      {{ vaultReactive.name }}
    </h1>
    <GetDare :vaultId="vaultId"></GetDare>
    <div class="bg-gray-400 w-[60vw] flex justify-around rounded-xl">
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
    <DisplayMembers v-show="users" :vaultId="vaultId"></DisplayMembers>
    <div v-show="addDare">
      <AddDare :vaultId="vaultId"></AddDare>
    </div>

    <div v-show="share" class="text-center p-3 font-[Raleway] font-medium">
      <h3 class="p-2 text-2xl">{{ vaultId }}</h3>
      <h3 class="p-2 text-2xl">{{ vaultReactive.name }}</h3>
      <small>Use this to invite other people to this vault!</small>
    </div>

    <!-- TODO: Update security rules to only allow owner to delete -->
    <DeleteVault v-if="isOwner" :vaultId="vaultId"></DeleteVault>
  </div>
</template>

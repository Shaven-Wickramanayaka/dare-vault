<script setup>
import { useCurrentUser, useDocument, useFirestore } from "vuefire";
import { doc } from "firebase/firestore";
import JoinVault from "../components/JoinVault.vue";
import MakeVault from "../components/MakeVault.vue";
import Navbar from "../components/Navbar.vue";

const db = useFirestore();
const user = useCurrentUser();

const userRef = doc(db, "users", user.value.uid);
const userData = useDocument(userRef);
</script>
<template>
  <div>
    <h1 class="text-3xl my-4 w-fit font-[Pacifico]">
      Hello {{ user.displayName }}
    </h1>
    <ul classs="p-2">
      <li v-for="(vaultName, vaultId) in userData?.joinedVaults" :key="vaultId">
        <a :href="'/vaults/' + vaultId">
          <p>{{ vaultName }}</p>
        </a>
      </li>
    </ul>
    <JoinVault></JoinVault>
    <MakeVault></MakeVault>
  </div>
</template>

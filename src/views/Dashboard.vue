<script setup>
import { useCurrentUser, useDocument, useFirestore } from "vuefire";
import { useCollection } from "vuefire";
import { collection, doc, query } from "firebase/firestore";
import { computed } from "vue";
import JoinVault from "../components/JoinVault.vue";
import MakeVault from "../components/MakeVault.vue";

const db = useFirestore();
const user = useCurrentUser();

const userRef = doc(db, "users", user.value.uid);
const userData = useDocument(userRef);
</script>
<template>
  <div>
    <h1>Hello {{ user.displayName }}</h1>
    <ul classs="p-2">
      <li v-for="(vaultName, vaultId) in userData.joinedVaults" :key="vaultId">
        <a :href="'/vaults/' + vaultId">
          <p>{{ vaultName }}</p>
        </a>
      </li>
    </ul>
    <JoinVault></JoinVault>
    <MakeVault></MakeVault>
  </div>
</template>

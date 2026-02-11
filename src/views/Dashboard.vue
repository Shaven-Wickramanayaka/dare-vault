<script setup>
import { useCurrentUser, useFirestore } from "vuefire";
import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";
const db = useFirestore();
const user = useCurrentUser();
const vaults = useCollection(collection(db, "vaults"));
</script>
<template>
  <div>
    <h1>Hello {{ user.displayName }}</h1>
    <ul>
      <li v-for="vault in vaults" :key="vault.id">
        <p>{{ vault.Name }}</p>
      </li>
    </ul>
  </div>
</template>

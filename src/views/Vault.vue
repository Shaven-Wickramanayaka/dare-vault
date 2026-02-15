<script setup>
import { useCurrentUser, useFirestore } from "vuefire";
import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";
const db = useFirestore();
const user = useCurrentUser();

const getDare = () => {};
</script>
<template>
  <button @click="GetDare" class="p-3">Get Dare</button>
</template>

<script setup>
import { useCurrentUser, useFirestore } from "vuefire";
import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";
const db = useFirestore();
const user = useCurrentUser();
const vaults = useCollection(collection(db, "vaults"));
</script>
<template>
  <h1>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
    voluptate nam saepe perferendis laudantium, officia iusto tenetur ipsum
    dicta omnis corrupti quas, consequuntur nostrum, soluta harum! Laboriosam
    magnam tempore est!
  </h1>
</template>

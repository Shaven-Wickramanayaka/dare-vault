<script setup>
import { ref } from "vue";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { getCurrentUser, useFirestore } from "vuefire";
const dareName = ref("");
const dareSpice = ref(0);
const props = defineProps({
  vaultId: {
    type: String,
    required: true,
  },
});

const addDare = async () => {
  const db = useFirestore();
  const user = await getCurrentUser();
  const randomId = Math.random();
  await addDoc(collection(db, "vaults", props.vaultId, "dares"), {
    creatorName: user.displayName,
    title: dareName.value,
    spice: dareSpice.value,
    createdAt: serverTimestamp(),
    random: randomId,
  })
    .then((data) => {
      alert("dare added!");
    })
    .catch((error) => {
      alert("Error occured: no dare added");
      console.log(error);
    });
};
</script>
<template>
  <input type="text" v-model="dareName" placeholder="Dare title" />
  <input type="range" min="0" max="3" v-model="dareSpice" />
  <button @click="addDare">Add dare</button>
</template>

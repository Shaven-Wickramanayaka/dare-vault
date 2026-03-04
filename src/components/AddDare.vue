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
  <div class="flex flex-col justify-center text-center">
    <h2 class="p-2 m-2 text-2xl font-medium">Add Dare</h2>
    <input
      type="text"
      v-model="dareName"
      placeholder="Dare title"
      class="p-2 mt-0.5"
    />
    <input type="range" min="0" max="3" v-model="dareSpice" class="p-2 mt-2" />
    <button
      @click="addDare"
      class="p-2 bg-red-400 m-2 hover:bg-red-500 rounded-lg"
    >
      Add dare
    </button>
  </div>
</template>
<style scoped>
::placeholder {
  text-align: center;
}
</style>

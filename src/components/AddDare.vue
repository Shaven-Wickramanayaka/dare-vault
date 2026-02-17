<script setup>
import { ref } from "vue";
const dareName = ref("");
const dareSpice = ref();
const props = defineProps({
  vaultId: {
    type: String,
    required: true,
  },
});

const addDare = () => {};
</script>
<template>
  <input type="text" v-model="dareName" placeholder="Dare title" />
  <input type="range" min="0" max="3" v-model="dareSpice" />
  <button @click="addDare">Add dare</button>
</template>

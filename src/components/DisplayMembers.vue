<script setup>
import { ref } from "vue";
import { useDocument, useFirestore } from "vuefire";
import { doc } from "firebase/firestore";

const dareName = ref("");
const dareSpice = ref(0);
const props = defineProps({
  vaultId: {
    type: String,
    required: true,
  },
});
const db = useFirestore();
const vaultUserData = useDocument(doc(db, "vaults", props.vaultId));
</script>
<template>
  <ul classs="p-2">
    <li
      v-for="(userDisplayname, userId) in vaultUserData?.joinedUsers"
      :key="userId"
      class="m-2 font-[Raleway] font-medium text-xl"
    >
      <p>{{ userDisplayname }}</p>
    </li>
  </ul>
</template>

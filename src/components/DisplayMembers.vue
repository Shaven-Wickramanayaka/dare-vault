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
  <div class="h-70 overflow-auto">
    <h2
      class="font-[Raleway] text-2xl font-bold p-2 text-(--color-deep-forest) text-center"
    >
      Members
    </h2>
    <ul classs="p-2 overflow-y-auto">
      <li
        v-for="(userDisplayname, userId) in vaultUserData?.joinedUsers"
        :key="userId"
        class="m-2 font-[Raleway] font-medium text-[1.1rem] text-center text-(--text-on-dark) tracking-wide"
      >
        <p>{{ userDisplayname }}</p>
      </li>
    </ul>
  </div>
</template>
<style scoped>
::-webkit-scrollbar {
  width: 11px;
}

::-webkit-scrollbar-track {
  background: var(--color-sage-dark);
  border-radius: 10px !important;
}

::-webkit-scrollbar-thumb {
  background: var(--color-deep-forest);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #1e3321;
}
</style>

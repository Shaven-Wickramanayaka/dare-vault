<script setup>
import { ref } from "vue";
import { useFirestore } from "vuefire";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
const db = useFirestore();
const props = defineProps({
  vaultId: {
    type: String,
    required: true,
  },
});
const vaultId = props.vaultId;
const dareTitle = ref("");
const getDare = async () => {
  const dareCollectionRef = collection(db, "vaults", vaultId, "dares");
  const randomId = Math.random();
  let dareSnapshot = await getDocs(
    query(
      dareCollectionRef,
      where("random", ">", randomId),
      orderBy("random"),
      limit(1),
    ),
  );
  if (dareSnapshot.empty) {
    dareSnapshot = await getDocs(
      query(
        dareCollectionRef,
        where("random", "<=", randomId),
        orderBy("random", "desc"),
        limit(1),
      ),
    );
  }

  if (dareSnapshot.empty) {
    dareTitle.value = "No dares available";
    return;
  }

  dareTitle.value = dareSnapshot.docs[0].data()?.title ?? "Untitled dare";
};
</script>
<template>
  <div
    class="flex flex-col items-center justify-center text-center p-2 m-2 border-solid border-2 w-[60vw] rounded-lg"
  >
    <h1 class="text-4xl p-2 m-2">{{ dareTitle }}</h1>
    <button
      @click="getDare"
      class="p-2 m-2 bg-red-400 rounded-lg hover:bg-red-500"
    >
      Get Dare
    </button>
  </div>
</template>

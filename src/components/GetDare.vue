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
  <button @click="getDare">Get Dare</button>
  <h1>{{ dareTitle }}</h1>
</template>

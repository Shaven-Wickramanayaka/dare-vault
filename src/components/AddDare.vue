<script setup>
import { ref } from "vue";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { getCurrentUser, useFirestore } from "vuefire";
const dareName = ref("");
const dareDesc = ref("");
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
  if (dareName.value == "") {
    alert("Please enter a dare title");
    return;
  }
  if (dareName.value.trim().length === 0) {
    alert("Enter a valid dare title");
    return;
  }
  await addDoc(collection(db, "vaults", props.vaultId, "dares"), {
    creatorName: user.displayName,
    title: dareName.value,
    description: dareDesc.value,
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
  dareName.value = "";
  dareName.placeholder = "Dare Title";
  dareDesc.value = "";
  dareDesc.placeholder = "A devious dare that is very devious";
};
</script>
<template>
  <div
    class="bg-(--color-evergreen) flex flex-col h-80 aspect-3/2 text-center mt-6 mx-6 px-9 pt-2 pb-4 rounded-2xl justify-between shadow-2xl shadow-[#283929]"
  >
    <h2 class="p-2 m-2 text-2xl font-medium text-(--text-on-dark)">Add Dare</h2>
    <label
      for="dare-name"
      class="p-1 font-[Raleway] font-bold tracking-wider text-(--text-on-dark) text-[0.8rem]"
      >Dare Title
    </label>
    <input
      name="dare-name"
      type="text"
      v-model="dareName"
      placeholder="Dare title"
      class="m1 p-1 border-2 rounded-lg text-(--color-mint-bright)"
    />
    <label
      for="dare-description"
      class="p-1 font-[Raleway] font-bold tracking-wider text-(--text-on-dark) text-[0.8rem]"
      >Description
    </label>
    <textarea
      v-model="dareDesc"
      name="dare-description"
      class="p-1 border-2 pb-9 rounded-lg text-(--color-mint-bright)"
      rows="4"
      placeholder="A devious dare that is very devious"
    ></textarea>
    <!-- Might implement this later
    <input
      hidden="true"
      type="range"
      min="0"
      max="3"
      v-model="dareSpice"
      class="p-2 mt-2"
    /> -->
    <button
      @click="addDare"
      class="p-2 rounded-lg mt-2.5 font-[Raleway] font-medium bg-(--color-sage-light) cursor-pointer hover:bg-(--secondary-accent) text-(--color-deep-forest) active:bg-(--highlight)"
    >
      Add dare
    </button>
  </div>
</template>
<style scoped>
::placeholder {
  text-align: center;
}

.selected {
  color: black;
}
::-webkit-scrollbar {
  width: 11px;
}

::-webkit-scrollbar-track {
  background: var(--color-deep-forest);
  border-radius: 0px 8.5px 8.5px 0px;
  z-index: 2;
}

::-webkit-scrollbar-thumb {
  background: var(--color-sage-dark);
  border-radius: 8.5px 8.5px 8.5px 8.5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-sage-light);
}
textarea {
  resize: none;
}
</style>

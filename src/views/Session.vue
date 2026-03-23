<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
import { useCurrentUser, useFirestore, useDocument } from "vuefire";
import { gsap } from "gsap/gsap-core";
const players = ref([]);
const route = useRoute();
const vaultId = route.params.id;
const db = useFirestore();
const vaultRef = doc(db, "vaults", vaultId);
const vaultReactive = useDocument(vaultRef);
const playerIndex = ref(0);
const dareSentence = ref();
const getDare = () => {
  let tl = gsap.timeline();
  tl.to("#dareButton", {
    duration: 4,
    ease: "power1.inOut",
    rotation: 1440,
  }).fromTo("#dareDisplay", { opacity: 0 }, "#dareDisplay", { opacity: 1 });
};
onMounted(() => {
  const playerJson = sessionStorage.getItem("players");
  if (playerJson) {
    try {
      players.value = JSON.parse(playerJson);
    } catch (error) {
      alert("Error loading players, try closing the tab and opening it?");
    }
  }
});
</script>
<template>
  <nav
    class="flex flex-row h-11.25 items-center bg-(--color-deep-forest) justify-between mt-3"
  >
    <h1
      class="ml-6 mt-5 text-[1.3rem] font-[Pacifico] text-(--color-mint-bright) justify-self-start tracking-wider"
    >
      <!--  -->
      {{ vaultReactive.name }}
    </h1>
    <button
      v-if="isOwner"
      @click="settingsOpen = true"
      class="inline-flex items-center relative hover:bg-[--color-sage-dark] mr-6 mt-5"
    >
      <span class="mdi mdi-cog text-[1.8rem] text-(--color-mint-bright)"></span>
    </button>
  </nav>
  <div class="flex flex-col md:flex-row justify-around">
    <div
      class="bg-(--color-evergreen) w-80 aspect-3/2 p-6 rounded-2xl flex justify-center items-center mt-6"
    >
      <button
        id="dareButton"
        class="w-30 aspect-square bg-(--secondary-accent) rounded-full hover:bg-(--highlight)"
        @click="getDare"
      >
        <p>Get Dare!</p>
      </button>
    </div>
    <div
      class="bg-(--color-evergreen) w-80 aspect-3/2 p-6 rounded-2xl flex justify-center items-center mt-6"
    >
      <div id="dareDisplay" class="">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          numquam nemo deserunt hic fuga? Consequatur blanditiis quasi incidunt
          dolores, sequi harum nemo pariatur aliquam animi odio suscipit
          deleniti rem nisi!
        </p>
      </div>
    </div>
  </div>
</template>

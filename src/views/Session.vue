<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  doc,
  getDocs,
  collection,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useFirestore, useDocument } from "vuefire";
import { gsap } from "gsap";
const players = ref([]);
const route = useRoute();
const router = useRouter();
const vaultId = route.params.id;
const db = useFirestore();
const vaultRef = doc(db, "vaults", vaultId);
const vaultReactive = useDocument(vaultRef);
const playerIndex = ref(0);
const dareSentence = ref();
const closeConfirmation = ref(false);
const dareCollectionRef = collection(db, "vaults", vaultId, "dares");
let dareTitle = ref("");
let dareDesc = ref("");
async function dareRequest() {
  if (!players.value.length) {
    dareSentence.value = "No players playing";
    return;
  }
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
    dareTitle.value = "add some more dares into the vault";
    dareDesc.value = "With some nice descriptions please";
  } else {
    dareTitle.value =
      dareSnapshot.docs[0].data()?.title ??
      "A generic dare that somebody couldnt be asked to name >:(";
    dareDesc.value =
      dareSnapshot.docs[0].data()?.description ?? "No Description added";
  }

  const currentPlayer = players.value[playerIndex.value];
  dareSentence.value = `"${currentPlayer} has to ${dareTitle.value}"`;

  playerIndex.value += 1;
  if (playerIndex.value >= players.value.length) {
    playerIndex.value = 0;
  }
}
const getDare = async () => {
  let tl = gsap.timeline();
  gsap.killTweensOf("#dareButton");
  gsap.set("#dareButton", { rotation: "0" });
  tl.add("anim_start", "+=0").to(
    "#dareButton",
    {
      duration: 3,
      ease: "power1.inOut",
      rotation: "+=1440",
    },
    "anim_start",
  );
  tl.to(
    "#dareDisplay",
    { opacity: 0, duration: 1.5, ease: "power1.inOut" },
    "anim_start",
  ).to(
    "#dareDisplay",
    {
      opacity: 1,
      backgroundColor: "#709775",
      duration: 1.5,
      ease: "power1.inOut",
    },
    2,
  );
  setTimeout(async () => {
    await dareRequest();
  }, 1500);
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
  <div
    class="bg-[#12121297] h-screen w-screen z-10 absolute m-0 p-0 flex justify-center items-center"
    v-if="closeConfirmation"
  >
    <div
      class="bg-(--color-evergreen) w-80 aspect-3/2 p-6 rounded-2xl"
      v-if="closeConfirmation"
    >
      <div class="flex justify-center flex-col">
        <div class="flex justify-between items-center">
          <h2
            class="text-2xl text-center font-medium font-[Raleway] text-(--text-on-dark)"
          >
            Wait!
          </h2>

          <span
            class="mdi mdi-close-circle text-[1.8rem] text-(--secondary-accent) hover:text-(--highlight) cursor-pointer"
            @click="closeConfirmation = false"
          ></span>
        </div>

        <h3
          class="text-xl text-center font-medium font-[Raleway] text-(--text-on-dark) my-3"
        >
          Are you sure you want to close the session?
        </h3>
        <button
          class="p-2 rounded-lg mt-2.5 font-[Raleway] font-medium bg-(--color-sage-light) cursor-pointer hover:bg-(--secondary-accent) text-(--color-deep-forest) active:bg-(--highlight)"
          @click="router.go(-1)"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
  <nav
    class="flex flex-row h-11.25 items-center bg-(--color-deep-forest) justify-between mt-3"
  >
    <h1
      class="ml-6 mt-5 text-2xl lg:text-3xl font-[Pacifico] text-(--color-mint-bright) justify-self-start tracking-wider"
    >
      <!--  -->
      {{ vaultReactive.name }}
    </h1>
    <button
      @click="closeConfirmation = true"
      class="inline-flex items-center relative hover:bg-[--color-sage-dark] mr-6 mt-5"
    >
      <span
        class="mdi mdi-close-circle text-[1.8rem] text-red-400 hover:text-red-500 cursor-pointer"
      ></span>
    </button>
  </nav>
  <div
    class="flex flex-col md:flex-row justify-center md:justify-around items-center"
  >
    <div
      class="bg-(--color-evergreen) w-90 aspect-3/2 p-6 rounded-2xl flex flex-col justify-center items-center mt-6 shadow-2xl shadow-[#283929]"
    >
      <button
        id="dareButton"
        class="w-40 aspect-square bg-(--secondary-accent) rounded-full hover:bg-(--highlight) cursor-pointer border-2 border-(--highlight) font-[Pacifico]"
        @click="getDare"
      >
        <p class="text-[1.4rem]">Get Dare!</p>
      </button>
    </div>
    <div
      class="bg-(--color-evergreen) w-90 aspect-3/2 p-6 rounded-2xl flex flex-col justify-center items-center mt-6 shadow-2xl shadow-[#283929]"
    >
      <div
        id="dareDisplay"
        class="font-[Raleway] text-xl p-2 rounded-2xl items-center"
      >
        <h4 v-if="dareSentence" class="font-medium">
          {{ dareSentence }}
        </h4>
        <h4
          v-else
          class="my-3 font-medium tracking-tight text-(--text-on-dark)"
        >
          Hocus Pocus Dare Invokus!
        </h4>
        <small
          v-show="dareDesc"
          class="p-1 font-[Raleway] font-medium tracking-tight"
          >{{ dareDesc }}</small
        >
      </div>
      <legend
        v-if="dareSentence"
        class="mt-2 p-1 font-[Raleway] font-bold text-(--text-on-dark) text-xl text-center"
      >
        Click the button again for your next dare
      </legend>
    </div>
  </div>
</template>

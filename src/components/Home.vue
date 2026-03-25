<script setup>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import { ref, onMounted } from "vue";
import gsap from "gsap";

const images = [["/background.png"]];

const ribbonRefs = ref([]);

onMounted(() => {
  ribbonRefs.value.forEach((ribbon) => {
    const track = ribbon.querySelector(".ribbon-track");
    const trackHeight = track.scrollHeight / 2;
    gsap.to(track, {
      y: -trackHeight,
      duration: 10 + gsap.utils.random(1, 5) * 7,
      ease: "none",
      repeat: -1,
    });
  });
});
</script>
<template>
  <Navbar></Navbar>
  <section class="flex flex-col justify-center items-center text-center">
    <pre
      class="text-(--text-on-dark) text-[0.9rem] md:text-[1.3rem] lg:text-[1.5rem] mt-7"
    >
 ____                                  _ _   
|  _ \  __ _ _ __ _____   ____ _ _   _| | |_ 
| | | |/ _` | '__/ _ \ \ / / _` | | | | | __|
| |_| | (_| | | |  __/\ V / (_| | |_| | | |_ 
|____/ \__,_|_|  \___| \_/ \__,_|\__,_|_|\__|
                                              
     </pre
    >
    <div
      class="grid grid-cols-2 grid-rows-4 gap-20 bg-(--color-evergreen) h-60 aspect-3/2 md:w-150 lg:w-200 md:aspect-3/1 mt-6 mx-6 p-6 rounded-2xl"
    >
      <div
        class="h-30 rounded-2xl aspect-square col-span-1 row-span-1 bg-amber-400"
      ></div>
      <div
        class="h-30 m-10 rounded-2xl aspect-square col-span-1 row-span-1 bg-amber-400"
      ></div>
      <div
        class="h-30 m-10 rounded-2xl aspect-square col-span-1 row-span-1 bg-amber-400"
      ></div>
      <div
        class="h-20 m-10 rounded-2xl aspect-square col-span-1 row-span-1 bg-amber-400"
      ></div>
      <div
        class="h-20 m-10 rounded-2xl aspect-square col-span-1 row-span-1 bg-amber-400"
      ></div>
    </div>
  </section>
  <!-- Do not annotate ascii bottom row, i do not know how to fix the alignment error anyother way -->
  <!-- <section>
      <div class="w-full text-center">
        <h1 class="text-4xl p-3 font-[Raleway] font-bold my-5 text-[#E83338]">
          Removing awkward pauses since 2026
        </h1>
      </div>
      <div class="w-full flex justify-center align-middle">
        <img class="w-fill" src="https://placehold.co/600x400" alt="" />
      </div>
    </section>
    <section
      class="h-screen flex justify-center items-center flex-col text-[#011640]"
    >
      <div class="w-[60vw]">
        <p class="font-[Raleway] text-2xl font-medium text-center">
          Darevault removes the frustration of thinking on the spot and lets you
          and your friends add your most devious ideas to a shared vault, so
          that the next time you're together it's less "Hmm, let me think of a
          question" and more "WHEN DID YOU DO THIS"
        </p>
      </div>
      <small class="font-[Pacifico] font-light p-2"
        >We are not liable for any broken friendships</small
      >
    </section> -
    <section
      class="flex flex-col md:flex-row flex-wrap items-center justify-between h-120 bg-amber-50"
    >
      <div class="flex-3 text-center">
        <h1
          class="font-[Pacifico] text-2xl md:text-3xl lg:text-4xl mt-8 md:mt-0 text-[#010A26] underline"
        >
          Darevault makes it easy to expose your friends
        </h1>
      </div>
      <div class="flex-2 justify-center shrink w-80">
        <img src="/Hero.png" alt="" class="rounded-lg" width="400" />
      </div>
      <!-- <div
        v-for="(imgs, index) in images"
        :key="index"
        class="ribbon"
        :ref="(el) => (ribbonRefs[index] = el)"
      >
        <div class="ribbon-track flex flex-col">
          <img
            v-for="(img, i) in [...imgs, ...imgs]"
            :key="i"
            :src="img"
            class="w-full object-cover h-90"
          />
        </div>
      </div> -
    </section>
    <section
      class="h-screen flex justify-center items-center-safe text-center font-[Raleway] font-medium bg-amber-50"
    >
      <p class="p-2 w-60 lg:w-70 text-2xl lg:text-3xl text-[#010A26]">
        "Spend less time worrying about what devious questions you can ask your
        friends and more time laughing at them." ❤️🎊
      </p>
    </section>
    <Footer></Footer>
  </main> -->
</template>
<!-- <style scoped>
pre {
  font-size: max(0.7rem, 1vmin);
}
</style> -->

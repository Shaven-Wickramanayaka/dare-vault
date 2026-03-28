<script setup>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { useRouter } from "vue-router";
const images = [["/background.png"]];
const router = useRouter();
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
      class="text-(--text-on-dark) text-[0.5rem] sm:text-[0.6rem] md:text-[1.4rem] lg:text-[1.5rem] mt-3"
    >
██████╗  █████╗ ██████╗ ███████╗██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝
██║  ██║███████║██████╔╝█████╗  ██║   ██║███████║██║   ██║██║     ██║   
██║  ██║██╔══██║██╔══██╗██╔══╝  ╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║   
██████╔╝██║  ██║██║  ██║███████╗ ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║   
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝   

</pre
    >
    <div
      class="flex justify-center items-center bg-(--color-evergreen) h-60 aspect-3/2 md:w-150 lg:w-200 md:aspect-3/1 mt-6 mx-6 p-6 rounded-2xl"
    >
      <p class="text-2xl font-[Raleway] font-black text-(--color-mint-bright)">
        "Stop forgetting that question you want to ask your friend. Use
        Darevault"
      </p>
    </div>
  </section>

  <section class="flex flex-col items-center text-center mt-20 h-200">
    <h2 class="text-[2.5rem] font-[Pacifico] text-(--text-on-dark)">
      How it works
    </h2>
    <div class="grid grid-cols-4 grid-rows-4 gap-x-15">
      <div class="flex justify-center flex-col items-center w-40 aspect-square">
        <h3
          class="p-2 text-2xl font-[Raleway] text-(--color-sage-dark) font-bold"
        >
          Step 1
        </h3>
        <img
          src="https://placehold.co/400"
          alt=""
          width="200px"
          class="rounded-2xl"
        />
        <legend
          class="p-2 font-[Raleway] font-medium text-(--color-mint-bright)"
        >
          Sign in using your email or Google.
        </legend>
      </div>
      <div class="aspect-square flex justify-center flex-col items-center w-40">
        <h3
          class="p-2 text-2xl font-[Raleway] text-(--color-sage-dark) font-bold"
        >
          Step 2
        </h3>
        <img
          src="https://placehold.co/400"
          alt=""
          width="200px"
          class="rounded-2xl"
        />
        <legend
          class="p-2 font-[Raleway] font-medium text-(--color-mint-bright)"
        >
          Make a new vault.
        </legend>
      </div>
      <div class="aspect-square flex justify-center flex-col items-center w-40">
        <h3
          class="p-2 text-2xl font-[Raleway] text-(--color-sage-dark) font-bold"
        >
          Step 3
        </h3>
        <img
          src="https://placehold.co/400"
          alt=""
          width="200px"
          class="rounded-2xl"
        />
        <legend
          class="p-2 font-[Raleway] font-medium text-(--color-mint-bright)"
        >
          Invite your friends using the vault id and name.
        </legend>
      </div>
      <div class="aspect-square flex justify-center flex-col items-center w-40">
        <h3
          class="p-2 text-2xl font-[Raleway] text-(--color-sage-dark) font-bold"
        >
          Step 4
        </h3>
        <img
          src="https://placehold.co/400"
          alt=""
          width="200px"
          class="rounded-2xl"
        />
        <legend
          class="p-2 font-[Raleway] font-medium text-(--color-mint-bright)"
        >
          Add dares!
        </legend>
      </div>
      <div class="aspect-square flex justify-center flex-col items-center w-40">
        <h3
          class="p-2 text-2xl font-[Raleway] text-(--color-sage-dark) font-bold"
        >
          Step 5
        </h3>
        <img
          src="https://placehold.co/400"
          alt=""
          width="200px"
          class="rounded-2xl"
        />
        <legend
          class="p-2 font-[Raleway] font-medium text-(--color-mint-bright)"
        >
          Start a session
        </legend>
      </div>
      <div class="aspect-square flex justify-center flex-col items-center w-40">
        <h3
          class="p-2 text-2xl font-[Raleway] text-(--color-sage-dark) font-bold"
        >
          Step 6
        </h3>
        <img
          src="https://placehold.co/400"
          alt=""
          width="200px"
          class="rounded-2xl"
        />
        <legend
          class="p-2 font-[Raleway] font-medium text-(--color-mint-bright)"
        >
          Get exposed
        </legend>
      </div>
      <div
        class="col-span-2 row-span-1 font-[Pacifico] flex justify-center items-center text-5xl aspect-auto text-(--text-on-dark)"
      >
        Thats it!
      </div>
    </div>
  </section>
  <section class="flex justify-center items-center">
    <div
      class="aspect-3/2 w-90 bg-(--color-evergreen) flex justify-center items-center rounded-2xl"
    >
      <button
        @click="router.push('/login')"
        class="p-3 bg-(--secondary-accent) cursor-pointer rounded-xl flex items-center justify-center hover:bg-(--highlight) font-[Raleway] font font-bold"
      >
        Get Started
      </button>
    </div>
  </section>
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

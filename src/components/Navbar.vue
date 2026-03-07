<script setup>
import { computed } from "vue";
import { useCurrentUser } from "vuefire";
import SignOutButton from "../components/SignOutButton.vue";
const user = useCurrentUser();
const username = computed(() => user.value?.displayName || null);
</script>
<template>
  <nav
    class="w-full flex justify-between items-center mx-auto px-3 sm:px-8 py-3 bg-[#b6d6F2] gap-2"
  >
    <div class="inline-flex">
      <Router-Link
        to="/"
        class="text-2xl lg:text-3xl font-[Pacifico] text-[#010A26]"
        >Darevault</Router-Link
      >
    </div>
    <div class="flex-initial">
      <div class="flex justify-end items-center relative">
        <div class="flex mr-4 items-center">
          <a class="inline-block py-2 px-3 rounded-full" href="#">
            <div
              class="flex items-center relative cursor-pointer sm:whitespace-nowrap"
            >
              <h2 class="p-2 text-sm sm:text-base" v-if="username">
                Hello {{ username }}
              </h2>
              <h2 class="p-2 text-sm sm:text-base font-[Raleway]" v-else>
                Hello Stranger
              </h2>
            </div>
          </a>
        </div>

        <div class="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center relative px-2 border rounded-full font-[Raleway] shrink-0 whitespace-nowrap"
          >
            <div v-if="username" class="p-1">
              <Router-Link to="/dashboard">Dashboard</Router-Link>
            </div>
            <div v-else class="p-1">
              <Router-Link to="/dashboard"><s>Dashboard</s></Router-Link>
            </div>
          </button>

          <div class="shrink-0">
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
    <!-- end login -->
  </nav>
</template>

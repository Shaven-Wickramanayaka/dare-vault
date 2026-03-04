<script setup>
import { computed } from "vue";
import { useCurrentUser } from "vuefire";
import SignOutButton from "../components/SignOutButton.vue";
const user = useCurrentUser();
const username = computed(() => user.value?.displayName || null);
</script>
<template>
  <nav
    class="w-full flex relative justify-between items-center mx-auto px-8 h-20 bg-amber -100"
  >
    <div class="inline-flex">
      <Router-Link to="/" class="text-2xl lg:text-3xl font-[Pacifico]"
        >Darevault</Router-Link
      >
    </div>

    <!-- end logo -->
    <!-- login -->
    <div class="flex-initial">
      <div class="flex justify-end items-center relative">
        <div class="flex mr-4 items-center">
          <a
            class="inline-block py-2 px-3 hover:bg-gray-200 rounded-full"
            href="#"
          >
            <div
              class="flex items-center relative cursor-pointer whitespace-nowrap"
            >
              <h2 class="p-2" v-if="username">Hello {{ username }}</h2>
              <h2 class="p-2" v-else>Hello Stranger</h2>
            </div>
          </a>
        </div>

        <div class="block">
          <div class="inline relative">
            <button
              type="button"
              class="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg mr-3"
            >
              <div v-if="username" class="p-2">
                <Router-Link to="/dashboard">Dashboard</Router-Link>
              </div>
              <div v-else class="p-2">
                <Router-Link to="/dashboard"><s>Dashboard</s></Router-Link>
              </div>
            </button>
            <SignOutButton></SignOutButton>
          </div>
        </div>
      </div>
    </div>
    <!-- end login -->
  </nav>
</template>

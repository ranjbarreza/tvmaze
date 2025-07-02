<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <UApp>
    <Header />

    <main class="w-full max-w-[1280px] mx-auto mt-22 sm:mt-20 pb-10 px-4 xl:px-0">
      <RouterView />
    </main>
  </UApp>
</template>

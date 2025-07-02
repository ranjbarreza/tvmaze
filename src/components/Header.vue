<script setup lang="ts">
import Search from '@/components/Search.vue'
</script>

<template>
  <header class="bg-neutral-700/50 backdrop-blur-md border-b border-neutral-700 fixed w-full left-0 top-0 z-10">
    <div class="w-full max-w-[1280px] mx-auto py-4 px-4 xl:px-0 sm:flex items-center relative">
      <UButton
        to="/"
        label="All shows"
        color="neutral"
        variant="link"
        active-class="collapse"
        class="hidden sm:flex"
      />

      <div class="sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
        <Search />
      </div>
    </div>
  </header>
</template>

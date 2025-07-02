<template>
  <div>
    <div class="w-48 rounded-xl animate-pulse h-8 bg-neutral-800 mb-4" />
    <div class="flex gap-2">
      <div
        v-for="n in 2"
        :key="n"
        class="w-full rounded-xl animate-pulse h-64 bg-neutral-800 sm:hidden"
      />
      <div
        v-for="n in 5"
        :key="n"
        class="hidden sm:block w-full rounded-xl animate-pulse h-64 bg-neutral-800"
      />
    </div>
  </div>
</template>

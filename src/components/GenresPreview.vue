<script setup lang="ts">
import type { ShowDetails } from '@/types/ShowDetails'
import ShowPreviewCard from '@/components/ShowPreviewCard.vue'

defineProps<{ genres: Record<string, ShowDetails[]> }>()
</script>

<template>
  <div
    v-for="shows, genre in genres"
    :key="genre"
    class="mb-10"
  >
    <div class="flex items-center justify-between w-full mb-2">
      <h2 class="font-semibold text-xl">
        Top 10 {{ genre }}
      </h2>
      <p>View more</p>
    </div>

    <div class="flex gap-2 pb-1 overflow-x-auto soft-scroll">
      <div
        v-for="show in shows.slice(0, 10)"
        :key="show.id"
        class="w-full"
      >
        <ShowPreviewCard :show />
      </div>
    </div>
  </div>
</template>

<style scoped>
.soft-scroll::-webkit-scrollbar {
  height: 6px;
}
.soft-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.soft-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 6px;
}

.soft-scroll:hover::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>

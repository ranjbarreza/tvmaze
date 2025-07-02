<script setup lang="ts">
import type { ShowDetails } from '@/types/ShowDetails'

defineProps<{ show: ShowDetails }>()
</script>

<template>
  <div class="w-44 rounded-xl overflow-hidden">
    <RouterLink :to="`shows/${show.id}`">
      <img :src="show.image?.medium" :alt="show.name" class="object-cover w-44" loading="lazy">
    </RouterLink>
  </div>
</template>

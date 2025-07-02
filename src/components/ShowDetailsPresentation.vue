<script setup lang="ts">
import type { ShowDetailsWithCast } from '@/types/ShowDetails'
import { useDateFormat } from '@vueuse/core'

defineProps<{ show: ShowDetailsWithCast }>()
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
    <img
      v-if="show.image"
      :src="show.image.original"
      :alt="show.name"
      class="w-full sm:w-82 object-cover block rounded-xl border border-neutral-700"
    >
    <div>
      <h1 class="font-semibold text-2xl sm:text-4xl mb-1">
        {{ show.name }}
      </h1>
      <UBadge
        v-for="genre in show.genres"
        :key="genre"
        class="rounded-full mr-1"
        size="sm"
        color="neutral"
        variant="subtle"
        :label="genre"
      />

      <div class="mt-4 grid grid-cols-3 sm:flex items-center gap-4 sm:gap-6 text-sm">
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-languages" />
          {{ show.language }}
        </div>
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-timer" />
          {{ show.runtime }} min
        </div>
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-star" />
          {{ show.rating.average }}
        </div>
        <div v-if="show.network" class="flex items-center gap-1.5">
          <UIcon name="i-lucide-clapperboard" />
          {{ show.network.name }}
        </div>
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-calendar" />
          <span>{{ useDateFormat(show.premiered, 'YYYY') }}<span v-if="show.ended"> - {{ useDateFormat(show.ended, 'YYYY') }}</span></span>
        </div>
      </div>
      <div class="mt-6" v-html="show.summary" />
    </div>
  </div>

  <div class="mt-8">
    <h2 class="font-semibold text-xl sm:text-2xl">
      Cast
    </h2>

    <div class="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2 w-full">
      <a
        v-for="cast in show._embedded.cast"
        :key="cast.person.id"
        :href="cast.person.url"
        target="_blank"
        class="relative block hover:[&>label]:underline rounded-xl overflow-hidden"
      >
        <img
          v-if="cast.person.image"
          :src="cast.person.image.medium"
          :alt="cast.person.name"
          class="object-cover w-full"
        >

        <label class="line-clamp-1 absolute bottom-0 left-0 w-full bg-black/30 backdrop-blur-md p-2 hover:underline">
          {{ cast.person.name }}
        </label>
      </a>
    </div>
  </div>
</template>

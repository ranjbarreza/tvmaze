<script setup lang="ts">
import type { ShowDetails } from '@/types/ShowDetails'
import { onClickOutside } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'

const toast = useToast()

const target = useTemplateRef<HTMLElement>('target')
const showResults = ref(false)

onClickOutside(target, () => showResults.value = false)

const loading = ref(false)
const inputValue = ref('')
const results = ref<{ score: number, show: ShowDetails }[] | null>(null)

async function performSearch() {
  loading.value = true
  try {
    const response = await fetch(`https://api.tvmaze.com//search/shows?q=${encodeURIComponent(inputValue.value)}`)

    if (!response.ok) {
      toast.add({
        title: 'Something went wrong',
        description: 'Please try again',
        color: 'error',
      })
    }

    results.value = await response.json()
    showResults.value = true
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UButtonGroup size="xl">
    <UInput
      :loading
      icon="i-lucide-search"
      placeholder="Search..."
      v-model="inputValue"
      color="neutral"
      variant="subtle"
      @keyup.enter="performSearch"
      :ui="{
        base: 'sm:w-98 rounded-full',
      }"
    />

    <UButton
      color="neutral"
      variant="subtle"
      icon="i-lucide-move-right"
      aria-label="Search"
      :disabled="!inputValue"
      @click="performSearch"
      :ui="{ base: 'rounded-full pr-4' }"
    />
  </UButtonGroup>

  <div
    class="bg-neutral-800 p-2 mt-1 rounded-md border border-neutral-700 absolute sm:w-98"
    v-if="showResults"
    ref="target"
  >
    <template v-if="results?.length">
      <RouterLink
        v-for="result in results"
        class="block p-2 hover:bg-neutral-700 rounded-sm"
        :key="result.show.id"
        @click="showResults = false"
        :to="`/shows/${result.show.id}`"
      >
        {{ result.show.name }}
      </RouterLink>
    </template>

    <div v-else>
      No results found.
    </div>
  </div>
</template>

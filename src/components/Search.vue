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
      v-model="inputValue"
      :loading
      icon="i-lucide-search"
      placeholder="Search..."
      color="neutral"
      variant="subtle"
      :ui="{
        base: 'sm:w-98 rounded-full',
      }"
      @keyup.enter="performSearch"
    />

    <UButton
      color="neutral"
      variant="subtle"
      icon="i-lucide-move-right"
      aria-label="Search"
      :disabled="!inputValue"
      :ui="{ base: 'rounded-full pr-4' }"
      @click="performSearch"
    />
  </UButtonGroup>

  <div
    v-if="showResults"
    ref="target"
    class="bg-neutral-800 p-2 mt-1 rounded-md border border-neutral-700 absolute sm:w-98"
  >
    <template v-if="results?.length">
      <RouterLink
        v-for="result in results"
        :key="result.show.id"
        class="block p-2 hover:bg-neutral-700 rounded-sm"
        :to="`/shows/${result.show.id}`"
        @click="showResults = false"
      >
        {{ result.show.name }}
      </RouterLink>
    </template>

    <div v-else>
      No results found.
    </div>
  </div>
</template>

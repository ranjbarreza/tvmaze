<script setup lang="ts">
import type { ShowDetails } from '@/types/ShowDetails'
import { onMounted, ref } from 'vue'
import GenresPreview from '@/components/GenresPreview.vue'
import GenresPreviewLoading from '@/components/GenresPreviewLoading.vue'

const loading = ref(false)
const genres = ref<Record<string, ShowDetails[]>>({})

onMounted(async () => {
  loading.value = true

  try {
    const res = await fetch('/api/shows')
    if (!res.ok) {
      throw new Error('Failed to fetch genres')
    }
    genres.value = await res.json()
  }
  catch (err) {
    console.error(err)
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <GenresPreviewLoading v-if="loading" />

    <div v-else-if="!Object.keys(genres).length">
      No shows available.
    </div>

    <GenresPreview
      v-else
      :genres
    />
  </div>
</template>

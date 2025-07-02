<script setup lang="ts">
import type { ShowDetailsWithCast } from '@/types/ShowDetails'
import { onMounted, ref, watch } from 'vue'
import ShowDetailsLoading from '@/components/ShowDetailsLoading.vue'
import ShowDetailsPresentation from '@/components/ShowDetailsPresentation.vue'

const props = defineProps<{ id: string }>()

const show = ref<ShowDetailsWithCast>()
const loading = ref(true)
const error = ref<string>()

const toast = useToast()

async function fetchShow(id: string) {
  loading.value = true
  error.value = undefined
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)

    if (!response.ok) {
      toast.add({
        title: 'Something went wrong',
        description: 'Please try again',
        color: 'error',
      })
      throw new Error('Could not fetch show')
    }

    show.value = await response.json()
  }
  catch (err: any) {
    error.value = err.message
    show.value = undefined
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchShow(props.id)
})

watch(() => props.id, (newId) => {
  fetchShow(newId)
})
</script>

<template>
  <div v-if="loading">
    <ShowDetailsLoading />
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>

  <template v-else-if="show">
    <ShowDetailsPresentation :show />
  </template>
</template>

<script setup lang="ts">
import type { ShowDetails } from '@/types/ShowDetails'
import { onMounted, ref } from 'vue'
import ShowDetailsLoading from '@/components/ShowDetailsLoading.vue'
import ShowDetailsPresentation from '@/components/ShowDetailsPresentation.vue'

const props = defineProps<{ id: string }>()

const show = ref<ShowDetails>()
const loading = ref(true)
const error = ref<string>()

const toast = useToast()

onMounted(async () => {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${props.id}?embed=cast`)

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
  }
  finally {
    loading.value = false
  }
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

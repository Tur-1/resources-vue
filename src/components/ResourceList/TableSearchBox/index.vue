<template>
  <div class="col-lg-4">
    <ResourceForm type="search" v-model="search" :placeholder="props.resource.searchPlaceholder" />
  </div>
</template>

<script setup>
import useResourceQueryString from '@/composables/useResourceQueryString'
import { ResourceForm } from '@/index'
import { ref, watch,computed } from 'vue'

const props = defineProps({
  resource:Object,
})
const queryString = useResourceQueryString() 

let search = ref('')

watch(search, (value) => {
  if (!value) {
    queryString.remove('search')
  } else {
    queryString.add('search', value)
  }
})
</script>

<style>
@import './table-search.css';
</style>
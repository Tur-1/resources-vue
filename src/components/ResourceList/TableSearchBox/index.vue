<template>
  <div class="col-lg-4">
    <ResourceForm type="search" v-model="search" :placeholder="props.resource.placeholder" />
  </div>
</template>

<script setup>
import useResourceQueryString from '@/composables/useResourceQueryString'
import { ResourceForm } from '@/index'
import { ref, watch,computed } from 'vue'

const props = defineProps({
  searchOptions:Object,
})
const queryString = useResourceQueryString()

const queryStringKey = computed(() => props.resource.queryStringKey || 'search')


let search = ref(queryString.get(queryStringKey.value))

watch(search, (value) => {
  if (!value) {
    queryString.remove(queryStringKey.value)
  } else {
    queryString.add(queryStringKey.value, value)
  }
})
</script>

<style>
@import './table-search.css';
</style>
<template>
 <div class="flex-shrink-0 col-lg-4 col-md-5 col-sm-12 mb-2">
    <ResourceForm type="search" v-model="search" :placeholder="props.searchPlaceholder" />
  </div>
</template>

<script setup>
import useResourceQueryString from '@/composables/useResourceQueryString'
import { ResourceForm } from '@/index'
import { ref, watch,computed } from 'vue'
import useResourceList from "@/composables/useResourceList";

const props = defineProps({
  searchPlaceholder:String,
})
const queryString = useResourceQueryString() 

let search = ref(queryString.get('search') ?? '')

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
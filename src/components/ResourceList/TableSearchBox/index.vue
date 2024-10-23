<template>
 <div class="flex-shrink-0 col-lg-4 col-md-5 col-sm-12 mb-2">
    <ResourceForm type="search" v-model="search" :placeholder="props.resource.searchPlaceholder" />
  </div>
</template>

<script setup>
import useResourceQueryString from '@/composables/useResourceQueryString'
import { ResourceForm } from '@/index'
import { ref, watch,computed } from 'vue'
import useResourceList from "@/composables/useResourceList";
const { fetchResourceData ,debounce} =
  useResourceList();
const props = defineProps({
  resource:Object,
})
const queryString = useResourceQueryString() 

let search = ref(queryString.get('search') ?? '')
const debouncedFetchResourceData = debounce(async () => {
   await fetchResourceData(props.resource.data);
}, 300);
watch(search, (value) => {
  if (!value) {
    queryString.remove('search')
  } else {
    queryString.add('search', value)
  }

  debouncedFetchResourceData();
})
</script>

<style>
@import './table-search.css';
</style>
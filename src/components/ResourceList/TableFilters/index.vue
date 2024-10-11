<template>
  <div class="btn-group">
    <button
      type="button"
      class="btn filter-btn"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="fa-solid fa-filter"></i>
      Filters
      <i class="fa-solid fa-angle-down"></i>
    </button>
    <ul class="dropdown-menu table-filters-menu p-3 overflow-auto">
      <li class="filter-header">
        <h6>Filters</h6>
        <a role="button" @click="resetFilters()" class="clear-btn">clear</a>
      </li>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <li v-for="(filter, index) in filters" class="mb-3" :key="index">
        <ResourceForm
          :type="filter.getType()"
          v-model="filter.selectedValue"
          :label="filter.label"
          :id="filter.id"
          @change="handleFilter(filter)"
          :placeholder="filter.placeholder"
          :options="getFilterOptions(filter)"
        />
      </li>

      <li>
        <slot />
      </li>
    </ul>
  </div>
</template>

<script setup>
import useResourceQueryString from '@/composables/useResourceQueryString'
import { ResourceForm } from '@/index'
import { onMounted, ref, watch } from 'vue'
const props = defineProps({
  filters: {
    required: true
  },
  paginationQueryKey:String,
})
const queryString = useResourceQueryString()
const filterOptions = ref([])

onMounted(async () => {
  const optionsPromises = props.filters
    .filter((filter) => filter.getType() === 'select')
    .map(async (filter) => {
      const filterOptions = await filter.getOptions()
      return {
        id: filter.queryKey(),
        data: filterOptions
      }
    })
  filterOptions.value = await Promise.all(optionsPromises)
})

function handleFilter(filter) {
  delete queryString.params.value[props.paginationQueryKey ?? 'page'];
  queryString.add(filter.queryKey(), filter.selectedValue)
  filter.handle()
}
const getFilterOptions = (filter) => {
  if (filter.getType() !== 'select') {
    return []
  }

  const foundOptions = filterOptions.value.find((opt) => opt.id === filter.queryKey())

  return foundOptions ? foundOptions.data : []
}
const resetFilters = () => {
  
  if (queryString.params.value ) { 
    queryString.reset() 
  }

  
}
 
</script>
<style>
@import './table-filters.css';
</style>
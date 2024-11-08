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
    <ul class="dropdown-menu table-filters-menu p-3 overflow-auto mt-1">
      <li class="filter-header">
        <h6>Filters</h6>
        <a role="button" @click="resetFilters()" class="clear-btn">clear</a>
      </li>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <li v-for="(filter, index) in reactiveFilters" class="mb-3" :key="index">
        <ResourceForm
          :type="filter.getType()"
          v-model="filter.selectedValue"
          :name="filter.classConstructorName"
          :label="filter.label"
          :id="filter.id"
          @change="handleFilter(filter)"
          :placeholder="filter.placeholder"
          :options="filter.getType() === 'select' ? filter.options() : []"
        />
      </li>

      <li>
        <slot />
      </li>
    </ul>
  </div>
</template>

<script setup>
import useResourceQueryString from "@/composables/useResourceQueryString";
import { ResourceForm } from "@/index";
import useBaseResource from "@/composables/useBaseResource";
import { toSnakeCase } from "@/helpers";
import { computed, onMounted, reactive, ref, toRaw, watch } from "vue";
const props = defineProps({
  filters: {
    required: true,
  },
  paginationQueryKey: String,
});
const queryString = useResourceQueryString();
const reactiveFilters = ref([]);
const filterOptions = ref([]);
let { selectedItems, bulkItems, isSelectAllItems } = useBaseResource();

const handleFilter = (filter) => {
  delete queryString.params.value[props.paginationQueryKey ?? "page"];
  queryString.add(filter.queryString, filter.selectedValue);
  filter.handle(filter.selectedValue);
  selectedItems.value = [];
  bulkItems.value = [];
};

const resetFilters = () => {
  if (Object.keys(queryString.params.value).length === 0) return;

  queryString.reset();
  reactiveFilters.value.forEach((filter) => {
    filter.selectedValue = "";
  });
  selectedItems.value = [];
  bulkItems.value = [];
  isSelectAllItems.value = false;
};

onMounted(() => {
  reactiveFilters.value = props.filters();
  reactiveFilters.value.forEach((filter) => {
    filter.classConstructorName = toSnakeCase(toRaw(filter).constructor.name);
    filter.selectedValue = ref(queryString.get(filter.queryString) ?? "");
  });
});
</script>
<style>
@import "./table-filters.css";
</style>

<template>
  <thead>
    <tr>
      <th
        v-for="column in columns" 
      >
        <span>{{ column.getLabel() }}</span>
        <!-- <span v-if="sortedColumn === column.field && sortDirection === 'asc'">
          <i class="bi bi-arrow-up"></i>
        </span>
        <span v-if="sortedColumn === column.field && sortDirection === 'desc'">
          <i class="bi bi-arrow-down"></i>
        </span> -->
      </th>
    </tr>
  </thead>
</template>

<script setup>
const props = defineProps({
  columns: Array,
  sortedColumn: String,
  sortDirection: String
})

const emits = defineEmits(['sortColumn'])

const sortColumn = (column) => {
  emits('sortColumn', column)
}
</script>

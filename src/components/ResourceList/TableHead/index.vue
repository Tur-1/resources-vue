<template>
  <thead>
    <tr>
      <th> 
          <input
            class="form-check-input"
            type="checkbox" 
            v-model="isSelectAllItems"
            @change="toggleSelectAll"
          />
        
      </th>
      <th
         
        v-for="(column, colIndex) in columns"
        :key="colIndex"
        :class="column.getClass()"
      >
      
        <template v-if="!column.isHidden()">
          <span>{{ column.getLabel() }}</span>
          <!-- <span v-if="sortedColumn === column.field && sortDirection === 'asc'">
          <i class="bi bi-arrow-up"></i>
        </span>
        <span v-if="sortedColumn === column.field && sortDirection === 'desc'">
          <i class="bi bi-arrow-down"></i>
        </span> -->
        </template>
      </th>
    </tr>
  </thead>
</template>

<script setup>
 import useBaseResource from "@/composables/useBaseResource";


const props = defineProps({
  columns: Array,
  sortedColumn: String,
  sortDirection: String, 
});
const { toggleSelectAll, isSelectAllItems } = useBaseResource();

const emits = defineEmits(["sortColumn"]);

const sortColumn = (column) => {
  emits("sortColumn", column);
};
 

</script>

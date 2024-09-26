<template>
  <tr>
    <td :colspan="columns.length" class="text-center">
      <h5>No Records Found</h5>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  columns: Array
})
</script>

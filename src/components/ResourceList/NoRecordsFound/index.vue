<template>
  <tr>
    <td :colspan="columns" class="text-center">
      <h5>No Records Found</h5>
    </td>
  </tr>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['columns'])
 
</script>

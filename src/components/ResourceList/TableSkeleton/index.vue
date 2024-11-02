<template>
  <tr v-for="i in 10" :key="i">
    <td class="placeholder-wave" v-for="column in columnsCount" :key="column">
      <span class="placeholder col-8"></span>
    </td>
  </tr>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['columnsLength'])

let columnsCount = computed(() => props.columnsLength + 2);
</script>

<template>
  <tr v-for="i in 10" :key="i">
    <td class="placeholder-wave" v-for="column in columnsLength" :key="column">
      <span class="placeholder col-8"></span>
    </td>
  </tr>
</template>

<script setup>
defineProps(['columnsLength'])
</script>
<style>
.placeholder{
  background-color: #909090bf !important;
  border-radius: 5px !important;
}
</style>
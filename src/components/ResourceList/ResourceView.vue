<template>
    <div class="resource-header">
        <h4>title</h4> 
    </div>
    <List :resource="props.resource"/>
</template>

<script setup>
import { onMounted } from 'vue';

import List from "./List.vue"

const props = defineProps({
  resource: {
    type: Object,
  },
  title:String,
});
onMounted(()=> {
 

}) 
</script>
 <style>

</style>
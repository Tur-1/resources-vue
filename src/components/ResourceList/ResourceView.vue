<template>
     {{ title }}
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  resource: {
    type: Object,
  }, 
});
 
let createPage = computed(async () => await props.resource.form().getData() == 'undefined')
let editPage = computed(async () => await props.resource.form().getData() !== 'undefined')
let title = ref('');
onMounted(async () => 
{ 
    console.log(createPage.value);
    
  if (createPage.value) {
    title.value = props.resource.form().createConfig.title;
    
  }else if(editPage.value) {
    title.value = props.resource.form().updateConfig.title; 
  }
   
})
 
</script>
 
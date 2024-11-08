<template>
  <li class="nav-item" :class="[props.class, { active: isActive }]">
    <RouterLink :to="{ name: props.to }" class="nav-link">
      <span class="sidebar-icon">
        <i :class="icon"></i>
        <slot />
      </span>
      <span class="sidebar-text">{{ props.title }}</span>
    </RouterLink>
  </li>
</template>

<script setup>
import { computed } from 'vue'
 

const props = defineProps({
  route:Object,
  class: String,
  active: String, 
  icon: String,
  title: {
    type: String,
    require: true
  },
  to: {
    type: String,
    require: true
  }
})

const isActive = computed(() => {
 
  if (props.active) {
    return props.route.name === props.active
  }
 
  
  return props.route.name?.startsWith(props.to)
})
</script>

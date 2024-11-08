<template>
  <li class="nav-item">
    <span
      class="nav-link d-flex justify-content-between align-items-center"
      :class="[{ collapsed: !isActive }]"
      data-bs-toggle="collapse"
      :data-bs-target="'#submenu-' + uniqueId"
      :aria-expanded="isActive ? true : false"
    >
      <span>
        <span class="sidebar-icon">
          <i :class="icon"></i>
        </span>
        <span class="sidebar-text">{{ title }}</span>
      </span>
      <span class="link-arrow">
        <svg
          class="icon icon-sm"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
    </span>
    <div
      class="multi-level collapse"
      :class="{ show: isActive }"
      role="list"
      :id="'submenu-' + uniqueId"
      :aria-expanded="isActive ? true : false"
    >
      <ul class="flex-column nav">
        <MenuLink
          v-for="(link, index) in links"
          :to="link.to"
          :active="link.to"
          :title="link.labelItem"
          class="text-start"
          :route="route"
          :key="index"
        />
      </ul>
    </div>
  </li>
</template>

<script setup>
import MenuLink from './MenuLink.vue'
import { computed, onMounted, ref } from 'vue'
 
const props = defineProps({
  route:Object,
  class: String,
  icon: String,
  links: Array,
  title: {
    type: String,
    require: true
  }
})

const uniqueId = ref('')

onMounted(() => {
  uniqueId.value = generateUniqueId()
})

function generateUniqueId() {
  return 'id-' + Math.random().toString(36).substr(2, 9)
}
const isActive = computed(() => {
  return props.links.some((link) => props.route.name?.startsWith(link.to))
})
</script>

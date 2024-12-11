<template>
  <div v-if="bulkItems.length > 0" class="dropdown">
    <button
      type="button"
      class="btn filter-btn"
      data-bs-toggle="dropdown"
      data-bs-target="#bulkActionsMenu"
      aria-expanded="false"
    >
      <span class="me-2"> Actions</span>
      <i class="fa-solid fa-angle-down"></i>
    </button>
    <ul class="resource-dropdown-menu dropdown-menu" id="bulkActionsMenu">
      <li
        v-for="(action, index) in bulkActions"
        :key="index"
      >
        <a
          class="dropdown-item d-flex align-items-center"
          href="#"
          @click.prevent="action.handle(bulkItems)"
        >
          <i :class="action.getIcon()" class="me-2"></i>
          {{ action.getLabel() }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(["bulkActions","bulkItems"]);
</script>
 

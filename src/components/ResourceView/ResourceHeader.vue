<template>
    <div class="resource-header">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color: transparent !important">
        <li class="breadcrumb-item">
          <RouterLink :to="{name:currentResourceListPage.pageName}">{{ currentResourceListPage.pageTitle }}</RouterLink>
        </li>

        <li 
          class="breadcrumb-item active"
          aria-current="page"
        >
          {{ currentResource.currentPage.type !== 'list' ? currentResource.currentPage.title :  'List' }}
        </li>
      </ol>
    </nav>
    <span class="resource-title">{{ currentResource.currentPage.title }}</span>
  </div>
</template>

<script setup>
const props = defineProps(['currentResourceListPage','currentResource'])
</script>

<style scoped>
.resource-header {
  margin: 15px 10px;
}
.resource-title {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 500;
}
</style>

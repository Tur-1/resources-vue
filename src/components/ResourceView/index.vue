<template>
  <ResourceHeader
    :currentResourceListPage="currentResourceListPage"
    :currentResource="currentResource"
  />
  <FormView
    v-if="
      currentResource.currentPage.type === 'create' ||
      currentResource.currentPage.type === 'edit'
    "
    :resource="currentResource"
  />
  <ResourceList
    v-if="currentResource.currentPage.type === 'list'"
    :resource="currentResource"
  />
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { getRouter } from "@/composables/useResourceRouter.js";
import ResourcesProvider from "@/Base/ResourcesProvider.js";
import ResourceList from "@/components/ResourceList/index.vue";
import FormView from "@/components/ResourceView/FormView.vue";
import ResourceHeader from "@/components/ResourceView/ResourceHeader.vue";

const router = getRouter()?.value;
let currentResource = ref(null);
let currentResourceListPage = ref(null);
const resourcesProvider = new ResourcesProvider();
watch(
  () => router.currentRoute.name,
  (routeName) => {
    currentResource.value = resourcesProvider.getCurrentResource(routeName);
    currentResourceListPage.value = currentResource.value
      .pages()
      .find((page) => page.pageType === "list");
  },
  { immediate: true }
); 
</script>

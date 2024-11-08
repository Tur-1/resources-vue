<script setup>
import PaginationSekeleton from "@/components/ResourceList/TableSkeleton/PaginationSekeleton.vue";
import useTableSkeletonLoading from "@/components/ResourceList/TableSkeleton/useTableSkeletonLoading"; 
import { computed } from "vue";
import useResourceQueryString from "@/composables/useResourceQueryString";
import BaseResourceException from "@/Exceptions/BaseResourceException";

const props = defineProps(["paginationQueryKey", "simplePagination",'pagination']);
 
const queryString = useResourceQueryString();

let pagination = computed(() => props.pagination);
let querykey = computed(() => props.paginationQueryKey ?? "page");


const changePage = async (url,active = false) => {
  if (url == null || active) return;

  const parsedUrl = new URL(url);
  const page = parsedUrl.searchParams.get(querykey.value);

  if (page) {
    queryString.add(querykey.value, page);
  } else {
    throw BaseResourceException.invalidPaginationQueryKey(querykey.value, url);
  }

  window.scrollTo(0, 0);
};
</script>
<template>
  <PaginationSekeleton v-if="useTableSkeletonLoading.isLoading" />

  <nav style="margin-top: 50px" v-if="!props.simplePagination">
    <ul class="pagination justify-content-end">
      <!-- Page Number Links -->
      <li
        v-for="link in pagination.links"
        :key="link.label"
        class="page-item"
        :class="{ active: link.active, disabled: link.url == null}"
      >
        <a
          class="page-link"
          role="button"
          @click.prevent="changePage(link.url,link.active)" 
          v-html="link.label"
        ></a>
      </li>
    </ul>
  </nav>
  <div
    class="resource-pagination"
    v-if="!useTableSkeletonLoading.isLoading && props.simplePagination"
  >
    <button
      class="pagination-btn pagination-prev"
      @click="changePage(pagination?.prev)"
      :disabled="pagination?.prev == null"
    >
      <i class="fa-solid fa-arrow-left"></i> <span>Previous</span>
    </button>
    <span class="pagination-current-number">{{
      pagination?.current_page
    }}</span>
    <button
      class="pagination-btn pagination-next"
      @click="changePage(pagination?.next)"
      :disabled="pagination?.next == null"
    >
      <span>Next</span>
      <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
</template>
<style>
@import "./table-pagination.css";
</style>

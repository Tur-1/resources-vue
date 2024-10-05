<script setup>
import PaginationSekeleton from '@/components/ResourceList/TableSkeleton/PaginationSekeleton.vue'
import useTableSkeletonLoading from '@/components/ResourceList/TableSkeleton/useTableSkeletonLoading'
import useResourceData from '@/stores/useResourceData'
import { computed } from 'vue'
import useResourceQueryString from '@/composables/useResourceQueryString'
import BaseResourceException from '@/Exceptions/BaseResourceException'

const props = defineProps(['paginationQueryKey'])

const resourceData = useResourceData()
const queryString = useResourceQueryString()

let paginationData = computed(() => resourceData.pagination.value)
let querykey = computed(() => props.paginationQueryKey ?? 'page')

const changePage = async (url) => {
  window.scrollTo(0, 0)

  const parsedUrl = new URL(url)
  const page = parsedUrl.searchParams.get(querykey.value)

  if (page) {
    queryString.add(querykey.value, page)
  } else {
    throw BaseResourceException.invalidPaginationQueryKey(querykey.value, url)
  }
}
</script>
<template>
  <PaginationSekeleton v-if="useTableSkeletonLoading.isLoading" />
  <div class="resource-pagination" v-if="!useTableSkeletonLoading.isLoading">
    <button
      class="pagination-btn pagination-prev"
      @click="changePage(paginationData?.prev)"
      :disabled="paginationData?.prev == null"
    >
      <i class="fa-solid fa-angle-left"></i> <span>Previous</span>
    </button>
    <span class="pagination-current-number">{{ paginationData?.current_page }}</span>
    <button
      class="pagination-btn pagination-next"
      @click="changePage(paginationData?.next)"
      :disabled="paginationData?.next == null"
    >
      <span>Next</span>
      <i class="fa-solid fa-angle-right"></i>
    </button>
  </div>
</template>
<style>
@import './table-pagination.css';
</style>
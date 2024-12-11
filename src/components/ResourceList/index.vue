<script setup>
import { watch, onMounted } from "vue";
import useResourceQueryString from "@/composables/useResourceQueryString";
import useBaseResource from "@/composables/useBaseResource";
import NoRecordsFound from "@/components/ResourceList/NoRecordsFound/index.vue";
import TableSkeleton from "@/components/ResourceList/TableSkeleton/index.vue";
import TableRow from "@/components/ResourceList/TableRow/index.vue";
import TablePagination from "@/components/ResourceList/TablePagination/index.vue";
import HeaderActions from "@/components/ResourceList/HeaderActions/index.vue";
import ResourceConfirmModal from "@/components/ResourceConfirmModal/index.vue";
import FiltersList from "@/components/ResourceList/FiltersList/index.vue";
import TableHead from "@/components/ResourceList/TableHead/index.vue";
import useTableSkeletonLoading from "@/components/ResourceList/TableSkeleton/useTableSkeletonLoading";
import ResourceIndicator from "@/components/ResourceIndicator/index.vue";
import ResourceNotification from "@/components/ResourceNotification/index.vue";
import Cards from "@/components/ResourceList/Cards.vue";
import Table from "@/components/ResourceList/Table.vue";
import BulkActions from "@/components/ResourceList/BulkActions/index.vue";

const props = defineProps({
  resource: {
    type: Object,
  },
});

const queryString = useResourceQueryString();
const {
  openConfirmModal,
  handleConfirmModal,
  fetchResourceData,
  debounce,
  pagination,
  dataList,
  bulkSelected,
  bulkItems,
} = useBaseResource();

const debouncedFetchResourceData = debounce(async () => {
  await fetchResourceData(props.resource.table);
}, 300);

watch(
  () => queryString.getParams(),
  (newValue) => {
    debouncedFetchResourceData();
  },
  { deep: true }
);

onMounted(async () => {
  queryString.getParams();
  await fetchResourceData(props.resource.table);
});
</script>
<template>
  <HeaderActions :headerActions="resource.table().listHeaderActions" />

  <div class="card shadow-sm mt-3 card-list">
    <div class="card-header pe-3 ps-3 pt-3">
      <div class="d-flex justify-content-between">
        <div class="col-md-2 col-lg-2">
          <FiltersList :filters="props.resource.table().listFilters">
            <slot name="filters" />
          </FiltersList>
        </div>

        <div class="d-flex justify-content-end flex-wrap gap-2 flex-grow-1">
          <BulkActions :bulkItems="bulkItems"  :bulkActions="props.resource.table().listBulkActions"/> 
        </div>
      </div>
    </div>
    <div class="card-body p-3">
      <Table v-if="props.resource.table().listDisplay == 'table'"
        @openConfirm="openConfirmModal"
        :dataList="dataList"
        :actions="props.resource.table().listActions"
        :columns="props.resource.table().listColumns"
      />
     <Cards
        v-else
        @openConfirm="openConfirmModal" 
        :dataList="dataList"
        :actions="props.resource.table().listActions"
        :columns="props.resource.table().listColumns"
      />
      <TablePagination
        v-if="pagination"
        :pagination="pagination"
        :simplePagination="props.resource.table().listSimplePagination"
      />
    </div>
  </div>

  <ResourceIndicator />
  <ResourceNotification />
  <ResourceConfirmModal @onConfirm="handleConfirmModal" />
</template>
<style>
@import "./css/table-list.css";

.placeholder {
  background-color: #909090bf !important;
  border-radius: 5px !important;
}

.card-list {
  border-radius: 10px;
}
</style>

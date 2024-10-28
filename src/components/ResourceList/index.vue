<script setup>
import { watch, onMounted, reactive, computed, ref } from "vue";
import useResourceQueryString from "@/composables/useResourceQueryString";
import useBaseResource from "@/composables/useBaseResource";
import NoRecordsFound from "@/components/ResourceList/NoRecordsFound/index.vue";
import TableSkeleton from "@/components/ResourceList/TableSkeleton/index.vue";
import TableRow from "@/components/ResourceList/TableRow/index.vue";
import useResourceData from "@/stores/useResourceData";
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

const props = defineProps({
  resource: {
    type: Object,
  },
});

const {
  openConfirmModal,
  handleConfirmModal,
  fetchResourceData,
  debounce,
  pagination,
  dataList,
} = useBaseResource();

 

const queryString = useResourceQueryString();
const debouncedFetchResourceData = debounce(async () => {
  await fetchResourceData(props.resource.data);
}, 300);

onMounted(async () => {
  await fetchResourceData(props.resource.data);
});

watch(
  () => queryString.params.value,
  (newValue, oldValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      debouncedFetchResourceData();
    }
  },
  { immediate: false }
);
</script>
<template>
  <h4>{{ props.resource.title }}</h4>

  <HeaderActions :resource="props.resource" />

  <div class="card shadow-sm mt-3">
    <div class="pe-3 ps-3 pt-3">
      <div class="row">
        <div class="col-md-2 col-lg-2">
          <FiltersList
            :filters="props.resource.filters"
            :paginationQueryKey="props.resource.paginationQueryKey"
          >
            <slot name="filters" />
          </FiltersList>
        </div>

        <div class="col-md-9 col-lg-10">
          <div class="row">
            <slot name="header" />
          </div>
        </div>
      </div>
    </div>
    <div class="card-body p-3">
      <Table
        v-if="props.resource.display == 'table'"
        @openConfirm="openConfirmModal"
        :resource="props.resource"
        :dataList="dataList"
        :actions="props.resource.actions()"
      />
      <Cards
        v-else
        @openConfirm="openConfirmModal"
        :resource="props.resource"
        :dataList="dataList"
       :actions="props.resource.actions()"
      />
      <TablePagination
        v-if="pagination.value?.length != 0"
        :simplePagination="props.resource.simplePagination"
        :paginationQueryKey="props.resource.paginationQueryKey"
      />
    </div>
  </div>

  <ResourceIndicator />
  <ResourceNotification />
  <ResourceConfirmModal @onConfirm="handleConfirmModal" />
</template>
<style>
@import "./table-list.css";

.placeholder {
  background-color: #909090bf !important;
  border-radius: 5px !important;
}
</style>

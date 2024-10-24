<script setup>
import { watch, onMounted, reactive, computed, ref } from "vue";
import useResourceQueryString from "@/composables/useResourceQueryString";
import useResourceList from "@/composables/useResourceList";
import NoRecordsFound from "@/components/ResourceList/NoRecordsFound/index.vue";
import TableSkeleton from "@/components/ResourceList/TableSkeleton/index.vue";
import TableRow from "@/components/ResourceList/TableRow/index.vue";
import useResourceData from "@/stores/useResourceData";
import TablePagination from "@/components/ResourceList/TablePagination/index.vue";
import HeaderActions from "@/components/ResourceList/HeaderActions/index.vue";
import ResourceConfirmModal from "@/components/ResourceConfirmModal/index.vue";
import TableFilters from "@/components/ResourceList/TableFilters/index.vue";
import TableHead from "@/components/ResourceList/TableHead/index.vue";
import useTableSkeletonLoading from "@/components/ResourceList/TableSkeleton/useTableSkeletonLoading";
import ResourceIndicator from "@/components/ResourceIndicator/index.vue";
import ResourceNotification from "@/components/ResourceNotification/index.vue";
import Cards from "@/components/ResourceList/cards.vue";

const props = defineProps({
  resource: {
    type: Object,
  },
});

const { openConfirmModal, handleConfirmModal, fetchResourceData, debounce } =
  useResourceList();
const queryString = useResourceQueryString();
const resourceDataList = useResourceData();
 

  const debouncedFetchResourceData = debounce(async () => {
  await fetchResourceData(props.resource.data)
}, 300);
  


let actions = ref([]);
let pages = ref([]);
onMounted(async () => {
  await fetchResourceData(props.resource.data);

 
  props.resource.actions().forEach((element) => {
    if (element.routeName) {
      pages.value.push(element);
    } else {
      actions.value.push(element);
    }
  });
});

watch(() => queryString.params.value, (newValue, oldValue) => {
  if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
    debouncedFetchResourceData();
  }
}, { immediate: false }); 

</script>
<template>
  <h4>{{ props.resource.title }}</h4>

  <HeaderActions :resource="props.resource"/>


  <div class="card shadow-sm mt-3">
    <div class="pe-3 ps-3 pt-3">
      <div class="row">
        <div class="col-md-2 col-lg-2">
          <TableFilters 
            :filters="props.resource.filters"
            :paginationQueryKey="props.resource.paginationQueryKey"
          >
            <slot name="filters" />
          </TableFilters>
        </div>

        <div class="col-md-9 col-lg-10">
          <div class="row">
            <slot name="header" />
          </div>
        </div>
      </div>
    </div>
    <div class="card-body p-3">
      <div class="table-responsive" v-if="props.resource.display == 'table'">
        <table class="table table-hover">
          <TableHead :columns="props.resource.fields()" />
          <tbody>
            <TableRow
              v-if="!useTableSkeletonLoading.isLoading"
              @openConfirm="openConfirmModal"
              :data="resourceDataList.list.value"
              :pages="pages"
              :columns="props.resource.fields()"
              :actions="actions"
            />
            <TableSkeleton
              v-if="useTableSkeletonLoading.isLoading"
              :columnsLength="props.resource.fields().length"
            />
            <NoRecordsFound
              v-if="
                !useTableSkeletonLoading.isLoading &&
                resourceDataList.list.value?.length == 0
              "
              :columns="props.resource.fields()"
            />
          </tbody>
        </table>
      </div>
      <template v-else>
        <Cards
          v-if="!useTableSkeletonLoading.isLoading"
          @openConfirm="openConfirmModal"
          :data="resourceDataList.list.value"
          :pages="pages"
          :columns="props.resource.fields()"
          :actions="actions"
          :displayLabel="props.resource.displayLabel"
        />
      </template>
      <TablePagination
        v-if="resourceDataList.pagination.value?.length != 0"
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
</style>

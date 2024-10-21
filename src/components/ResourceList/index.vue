<script setup>
import { watch, onMounted, reactive, computed, ref } from "vue";
import useResourceQueryString from "@/composables/useResourceQueryString";
import useResourceList from "@/composables/useResourceList";
import NoRecordsFound from "@/components/ResourceList/NoRecordsFound/index.vue";
import TableSkeleton from "@/components/ResourceList/TableSkeleton/index.vue";
import TableRow from "@/components/ResourceList/TableRow/index.vue";
import TableSearchBox from "@/components/ResourceList/TableSearchBox/index.vue";
import useResourceData from "@/stores/useResourceData";
import TablePagination from "@/components/ResourceList/TablePagination/index.vue";
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
  await fetchResourceData(props.resource.data);
}, 300);

watch(
  () => queryString.params.value,
  (value) => {
    debouncedFetchResourceData();
  },
  { deep: true }
);

const reactiveFilters = computed(() => reactive([...props.resource.filters()]));
const searchable = computed(() => props.resource.searchable ?? true);

let routeActions = ref([]);
let methodActions = ref([]);

onMounted(async () => {
  await fetchResourceData(props.resource.data);

  props.resource.headerActions().forEach((element) => { 
    if (element.routeName) {
      routeActions.value.push(element);
    }else{
      methodActions.value.push(element);
    }
  });
});
</script>
<template>
  <h4>{{ props.resource.title }}</h4>
  <div class="d-flex flex-wrap align-items-start justify-content-between mt-4">
    <TableSearchBox v-if="searchable" :resource="props.resource" />

    <div
      class="col-lg-8 col-md-7 d-flex justify-content-end flex-wrap gap-2 flex-grow-1"
    >
      <RouterLink
        v-for="action in routeActions"
        :to="{ name: action.routeName }"
        :class="action.class"
        class="btn btn-primary d-inline-flex align-items-center bg-dark border-0"
      >
        <i :class="action.icon" />
        <span class="ms-2">{{ action.label }}</span>
      </RouterLink>
      <button
        type="button"
        v-for="action in methodActions" 
        @click="action.handle()"
        :class="action.class"
        class="btn btn-primary d-inline-flex align-items-center bg-dark border-0"
      >
        <i :class="action.icon" />
        <span class="ms-2">{{ action.label }}</span>
      </button>
    </div>
  </div>

  <div class="card shadow-sm mt-3">
    <div class="pe-3 ps-3 pt-3">
      <div class="row">
        <div class="col-md-2 col-lg-2">
          <TableFilters
            :filters="reactiveFilters"
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
              :pages="props.resource.pages()"
              :columns="props.resource.fields()"
              :actions="props.resource.actions()"
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
          :pages="props.resource.pages()"
          :columns="props.resource.fields()"
          :actions="props.resource.actions()"
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

<script setup>
import { watch, onMounted, reactive, computed } from 'vue'
import useResourceQueryString from '@/composables/useResourceQueryString'
import useResourceList from '@/composables/useResourceList'
import NoRecordsFound from '@/components/ResourceList/NoRecordsFound/index.vue'
import TableSkeleton from '@/components/ResourceList/TableSkeleton/index.vue'
import TableRow from '@/components/ResourceList/TableRow/index.vue'
import TableSearchBox from '@/components/ResourceList/TableSearchBox/index.vue'
import useResourceData from '@/stores/useResourceData'

import TablePagination from '@/components/ResourceList/TablePagination/index.vue'
import ResourceConfirmModal from '@/components/ResourceConfirmModal/index.vue'
import TableFilters from '@/components/ResourceList/TableFilters/index.vue'
import TableHead from '@/components/ResourceList/TableHead/index.vue'
import useTableSkeletonLoading from '@/components/ResourceList/TableSkeleton/useTableSkeletonLoading'
import ResourceIndicator from '@/components/ResourceIndicator/index.vue'
import ResourceNotification from '@/components/ResourceNotification/index.vue'

const props = defineProps({
  resource: {
    type: Object
  },
  label: String,
  createResource: {
    type: Object,
    require: false,
    validator(value) {
      if (!value) return true // If `createResource` is not passed, it's valid

      const validKeys = ['route', 'class', 'icon', 'label'] // Define the allowed keys
      const keysAreValid = Object.keys(value).every((key) => validKeys.includes(key))

      if (!keysAreValid) {
        console.warn('createResource contains invalid keys')
        console.warn(`valid keys: ['route', 'class', 'icon', 'label']`)

        return false
      }

      if (
        typeof value.route !== 'object' ||
        !value.route.name ||
        typeof value.route.name !== 'string'
      ) {
        console.warn('route must be an object with a string name property')
        return false
      }

      if (value.class && typeof value.class !== 'string') {
        console.warn('class must be a string')
        return false
      }

      if (typeof value.label !== 'string') {
        console.warn('label must be a string')
        return false
      }

      return true
    }
  },
  pagination: {
    require: false
  },
  columns: {
    type: Array,
    require: true
  },
  data: {
    type: Function,
    require: true
  },
  searchablue: {
    type: Boolean,
    default: true
  },
  filters: {
    type: Array
  },
  actions: {
    type: Array
  }
})

const { openConfirmModal, handleConfirmModal, fetchResourceData, debounce } = useResourceList()
const queryString = useResourceQueryString()
const resourceDataList = useResourceData()
onMounted(async () => {
  await fetchResourceData(props.resource.data())
})

const debouncedFetchResourceData = debounce(async () => {
  await fetchResourceData(props.resource.data())
}, 300)

watch(
  () => queryString.params.value,
  (value) => {
    debouncedFetchResourceData()
  },
  { deep: false }
)

const reactiveFilters = computed(() => reactive([...props.resource.filters()]))
const searchable = computed(() => props.resource.searchOptions().searchable ?? true)
</script>
<template>
  <h4>{{ props.resource.title }}</h4>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
    <TableSearchBox v-if="searchable" :searchOptions="props.resource.searchOptions()" />

    <RouterLink
      v-if="props.resource.createResource"
      :to="props.resource.createResource.route"
      :class="props.resource.createResource.class"
      class="btn btn-primary d-inline-flex align-items-center bg-dark border-0"
    >
      <i :class="props.resource.createResource.icon ?? 'fa-solid fa-plus'" />
      <span class="ms-2">{{ props.resource.createResource.label }}</span>
    </RouterLink>
  </div>

  <div class="card shadow-sm mt-3">
    <div class="pe-3 ps-3 pt-3">
      <div class="row">
        <div class="col-md-2 col-lg-2">
          <TableFilters :filters="reactiveFilters">
            <template #filters>
              <slot name="filters" />
            </template>
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
      <div class="table-responsive">
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
              v-if="!useTableSkeletonLoading.isLoading && resourceDataList.list.value?.length == 0"
              :columns="props.resource.fields()"
            />
          </tbody>
        </table>
      </div>

      <TablePagination :paginationQueryKey="props.resource.paginationQueryKey" />
    </div>
  </div>

  <ResourceIndicator />
  <ResourceNotification />
  <ResourceConfirmModal @onConfirm="handleConfirmModal" />
</template>
<style>
@import './table-list.css';
</style>
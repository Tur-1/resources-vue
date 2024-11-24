<script setup>
import useBaseResource from "@/composables/useBaseResource"
import NoRecordsFound from "@/components/ResourceList/NoRecordsFound/index.vue";
import TableSkeleton from "@/components/ResourceList/TableSkeleton/index.vue";
import TableRow from "@/components/ResourceList/TableRow/index.vue";
import useTableSkeletonLoading from "@/components/ResourceList/TableSkeleton/useTableSkeletonLoading"; 
import TableHead from "@/components/ResourceList/TableHead/index.vue";
const props = defineProps({
  resource: {
    type: Object,
  }, 
  actions: Array,
  dataList: Object
});
const emits = defineEmits(["openConfirm"]); 
 
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <TableHead :columns="props.resource.table().getColumns()" />
      <tbody>
        <TableRow
          v-if="!useTableSkeletonLoading.isLoading"
          @openConfirm="(action,item) => $emit('openConfirm',action, item)"
          :data="dataList"
          :columns="props.resource.table().getColumns()"
          :actions="actions"
        />
        <TableSkeleton
          v-if="useTableSkeletonLoading.isLoading"
          :columnsLength="props.resource.table().getColumns().length"
        />
        <NoRecordsFound
          v-if="
            !useTableSkeletonLoading.isLoading &&
            dataList?.length == 0
          "
          :columns="props.resource.table().getColumns().length + 2"
        />
      </tbody>
    </table>
  </div>
</template>
<style>
@import "./table-list.css";
</style>

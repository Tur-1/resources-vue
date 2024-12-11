<script setup>
import useBaseResource from "@/composables/useBaseResource"
import NoRecordsFound from "@/components/ResourceList/NoRecordsFound/index.vue";
import TableSkeleton from "@/components/ResourceList/TableSkeleton/index.vue";
import TableRow from "@/components/ResourceList/TableRow/index.vue";
import useTableSkeletonLoading from "@/components/ResourceList/TableSkeleton/useTableSkeletonLoading"; 
import TableHead from "@/components/ResourceList/TableHead/index.vue";
const props = defineProps({ 
  actions: Array,
  columns: Array,
  dataList: Object
});
const emits = defineEmits(["openConfirm"]);  
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <TableHead :columns="props.columns" />
      <tbody>
        <TableRow
          v-if="!useTableSkeletonLoading.isLoading"
          @openConfirm="(action,item) => $emit('openConfirm',action, item)"
          :data="dataList"
          :columns="props.columns"
          :actions="actions"
        />
        <TableSkeleton
          v-if="useTableSkeletonLoading.isLoading"
          :columnsLength="props.columns.length"
        />
        <NoRecordsFound
          v-if="
            !useTableSkeletonLoading.isLoading &&
            dataList?.length == 0
          "
          :columns="props.columns.length + 2"
        />
      </tbody>
    </table>
  </div>
</template>
 
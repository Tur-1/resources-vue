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
  pages: Array,
  actions: Array,
  dataList: Object
});
const emits = defineEmits(["openConfirm"]); 
 
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <TableHead :columns="props.resource.fields()" />
      <tbody>
        <TableRow
          v-if="!useTableSkeletonLoading.isLoading"
          @openConfirm="(action,item) => $emit('openConfirm',action, item)"
          :data="dataList"
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
            dataList.value?.length == 0
          "
          :columns="props.resource.fields()"
        />
      </tbody>
    </table>
  </div>
</template>
<style>
@import "./table-list.css";
</style>

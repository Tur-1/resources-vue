<script setup>
import useResourceData from "@/stores/useResourceData";
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
});
const emits = defineEmits(["openConfirm"]);
const resourceDataList = useResourceData();

</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <TableHead :columns="props.resource.fields()" />
      <tbody>
        <TableRow
          v-if="!useTableSkeletonLoading.isLoading"
          @openConfirm="$emit('openConfirm')"
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
</template>
<style>
@import "./table-list.css";
</style>

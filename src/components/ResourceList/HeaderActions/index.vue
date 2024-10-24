<template>
   <div class="d-flex flex-wrap align-items-start justify-content-between mt-4">
    <TableSearchBox v-if="searchable" :searchPlaceholder="props.resource.searchPlaceholder" />

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
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import TableSearchBox from "@/components/ResourceList/TableSearchBox/index.vue";

let props = defineProps(['resource'])
let routeActions = ref([]);
let methodActions = ref([]);
const searchable = computed(() => props.resource.searchable ?? true);

props.resource.headerActions().forEach((element) => {
    if (element.routeName) {
      routeActions.value.push(element);
    } else {
      methodActions.value.push(element);
    }
  });
</script>

<style lang="scss" scoped>

</style>
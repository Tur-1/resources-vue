<template>
  <div class="d-flex flex-wrap align-items-start justify-content-between mt-4">
    <TableSearchBox
      v-if="searchable"
      :searchPlaceholder="props.resource.searchPlaceholder"
    />

    <div
      class="col-lg-8 col-md-7 d-flex justify-content-end flex-wrap gap-2 flex-grow-1"
    >
      <template v-for="action in resource.headerActions()">
        <template v-if="action.checkVisibility()">
          <RouterLink
            v-if="action.getRoute()"
            :to="action.getRoute()"
            :class="action.getClass()"
            class="btn btn-primary text-white d-inline-flex align-items-center bg-dark border-0"
          >
            <i :class="action.getIcon()" />
            <span class="ms-2">{{ action.getLabel() }}</span>
          </RouterLink>

          <button
            v-else
            type="button"
            @click="action.handle()"
            :class="action.getClass()"
            class="btn btn-primary text-white d-inline-flex align-items-center bg-dark border-0"
          >
            <i :class="action.getIcon()" />
            <span class="ms-2">{{ action.getLabel() }}</span>
          </button>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import TableSearchBox from "@/components/ResourceList/TableSearchBox/index.vue";
import useBaseResource from "@/composables/useBaseResource";

let props = defineProps(["resource"]);

const searchable = computed(() => props.resource.searchable ?? true);
const { resolveActions } = useBaseResource();
</script>

<style lang="scss" scoped></style>

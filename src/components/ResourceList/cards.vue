<template>
  <template v-if="!useTableSkeletonLoading.isLoading">
    <div class="row m-2 border-bottom">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="isSelectAllItems"
          @change="toggleSelectAll"
        />
      </div>
    </div>
    <div class="row">
      <div
        v-for="(item, index) in dataList"
        :key="item.id"
        class="col-12 col-md-4 col-lg-4 col-xl-3 mb-4"
      >
        <div class="card shadow-sm">
          <div class="p-2">
            <img
              v-if="imageColumn"
              :src="imageColumn.getField(item) ?? defaultImage"
              class="card-img-top rounded w-full"
              :class="imageColumn.getClass()"
              alt="Card Image"
              style="height: 180px; object-fit: cover; object-position: center"
            />
          </div>
          <div class="card-body p-2">
            <template v-for="column in columns">
              <div class="d-flex gap-2 mb-1" v-if="!column.isImageColumn">
                <span
                  :style="column.cssStyle"
                  :class="[
                    column.badgeClassCallback
                      ? `badge text-bg-${column.getBadgeClass(
                          column.getField(item)
                        )}`
                      : '',
                    column.getClass(),
                  ]"
                >
                  {{ column.getField(item) }}
                </span>
              </div>
            </template>

            <div class="d-flex justify-content-between align-items-center mt-2">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="item"
                  v-model="selectedItems"
                />
              </div>

              <ResourceActionsMenu class="text-end" v-if="actions.length > 0">
                <template
                  v-for="(action, actionIndex) in actions"
                  :key="actionIndex"
                >
                  <template v-if="!action.isHidden(item)">
                    <RouterLink
                      v-if="action.getRoute(item)"
                      :class="action.getClass()"
                      class="dropdown-item d-flex align-items-center rounded text-dark"
                      :to="action.getRoute(item)"
                    >
                      <i :class="action.getIcon()" class="me-2"></i>
                      {{ action.getLabel() }}
                    </RouterLink>
                    <a
                      v-else
                      @click="applyAction(action, item, index)"
                      role="button"
                      class="dropdown-item d-flex align-items-center rounded"
                      :class="action.getClass()"
                    >
                      <i :class="action.getIcon()" class="me-2"></i>
                      {{ action.getLabel() }}
                    </a>
                  </template>
                </template>
              </ResourceActionsMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <CardSekeleton v-else />

  <div
    v-if="!useTableSkeletonLoading.isLoading && dataList.length == 0"
    class="text-center"
  >
    <h5>No Records Found</h5>
  </div>
</template>

<script setup>
import ResourceActionsMenu from "@/components/ResourceActionsMenu/index.vue";
import useTableSkeletonLoading from "@/components/ResourceList/TableSkeleton/useTableSkeletonLoading";
import useBaseResource from "@/composables/useBaseResource";
import { computed, ref, watch } from "vue";
import CardSekeleton from "@/components/ResourceList/TableSkeleton/CardSekeleton.vue";
import defaultImage from "@/assets/default-image.jpg";

const emits = defineEmits(["openConfirm"]);
const props = defineProps(["resource", "actions", "dataList"]);
const columns = props.resource.table().getColumns();

const { bulkItems, selectedItems, toggleSelectAll, isSelectAllItems } =
  useBaseResource();

const imageColumn = computed(() =>
  columns.find((column) => column.isImageColumn)
);
const applyAction = (action, item, index) => {
  if (action.getConfirmAction()) {
    emits("openConfirm", action, { item: item, index: index });
  } else {
    action.handle(item, index);
  }
};

watch(
  () => selectedItems.value,
  (value) => {
    bulkItems.value = value;
  }
);
</script>
<style scoped>
.actions-hr {
  margin: 5px !important;
  color: #ccc !important;
}
.badge {
  font-size: unset !important;
  font-weight: unset !important;
}
.card {
  border: none;
}
</style>

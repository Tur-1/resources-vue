<script setup>
import ResourceActionsMenu from "@/components/ResourceActionsMenu/index.vue";
import useBaseResource from "@/composables/useBaseResource";
import defaultImage from "@/assets/default-image.jpg";
import { ref, watch } from "vue";

const props = defineProps(["columns", "data", "actions"]);
const emits = defineEmits(["openConfirm"]);

const { dataList,bulkItems ,bulkSelected} = useBaseResource();

const applyAction = (action, item, index) => {
  if (action.getConfirmAction()) {
    emits("openConfirm", action, { item: item, index: index });
  } else {
    action.handle(item, index);
  }
};
let selectedItems = ref([]);
watch(
  () => selectedItems.value,
  (value) => {
    bulkItems.value = value;
  }
);

 </script>

<template>
  <TransitionGroup name="list">
    <tr v-for="(item, index) in props.data" :key="index">
      <td>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :value="item"
            v-model="selectedItems"
          />
        </div>
      </td>
      <td
        v-for="(column, colIndex) in columns"
        :key="colIndex"
        :class="column.getClass()"
        :style="{
          textAlign: column.getAlign() + '!important',
          width: column.getWidth() + '!important',
        }"
      >
        <template v-if="!column.isHidden(item)">
          <img
            v-if="column.isImageColumn"
            :src="column.getField(item) ?? defaultImage"
            :alt="column.getField(item)"
            class="img-thumbnail"
            style="max-width: 80px; max-height: 80px"
          />
          <span class="fw-normal" v-else>
            {{ column.getField(item) }}
          </span>
        </template>
      </td>
      <td v-if="actions.length > 0">
        <ResourceActionsMenu>
          <template v-for="(action, actionIndex) in actions" :key="actionIndex">
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
      </td>
    </tr>
  </TransitionGroup>
</template>

<style scoped>
td {
  vertical-align: middle !important;
}

tr {
  cursor: pointer;
}

.actions-hr {
  margin: 5px !important;
  color: #ccc !important;
}
</style>

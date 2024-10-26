<script setup>
import ResourceActionsMenu from "@/components/ResourceActionsMenu/index.vue";
import useBaseResource from "@/composables/useBaseResource";

const props = defineProps(["columns", "data", "actions", "pages"]);
const emits = defineEmits(["openConfirm"]);

const { dataList, getRecordValue, getRecordImage, generateRecordRoute } =
  useBaseResource();

const applyAction = (action,item,index) =>
{ 

  if (action.confirmAction)
  {
    emits("openConfirm", action, { item: item, index: index });
  } else
  {
    action.handle(item,index);
  }
};
</script>

<template>
  <TransitionGroup name="list">
    <tr v-for="(item, index) in props.data" :key="item.id">
      <td v-for="column in columns" :key="column.id">
        <span class="fw-normal" v-if="!column?.action && !column?.image" :class="column.class">
          {{ getRecordValue(item, column) }}
        </span>
        <img v-if="column?.image" :src="getRecordImage(item, column)" :alt="column.label" :class="column.class"
          class="img-thumbnail" style="max-width: 80px; max-height: 80px" />

        <ResourceActionsMenu v-if="column?.action && actions.length > 0">
          <template v-for="(actionPage, pageIndex) in props.pages" :key="pageIndex">
            <RouterLink :class="actionPage.class" class="dropdown-item d-flex align-items-center rounded text-dark"
              :to="generateRecordRoute(actionPage, item)">
              <i :class="actionPage.icon" class="me-2"></i>
              {{ actionPage.label }}
            </RouterLink>
          </template>
          <hr class="actions-hr" v-show="props.pages.length > 0" />
          <template v-for="(action, actionIndex) in actions" :key="actionIndex">
            <a @click="applyAction(action, item, index)" role="button" class="dropdown-item d-flex align-items-center rounded"
              :class="action.class">
              <i :class="action.icon" class="me-2"></i>
              {{ action.label }}
            </a>
          </template>
        </ResourceActionsMenu>
      </td>
      <td v-if="actions.length > 0 && !columns.find((col) => col.action)">
        <ResourceActionsMenu>
          <template v-for="(actionPage, pageIndex) in props.pages" :key="pageIndex">
            <RouterLink :class="actionPage.class" class="dropdown-item d-flex align-items-center rounded text-dark"
              :to="generateRecordRoute(actionPage, item)">
              <i :class="actionPage.icon" class="me-2"></i>
              {{ actionPage.label }}
            </RouterLink>
          </template>
          <hr class="actions-hr" v-show="props.pages.length > 0" />
          <template v-for="(action, actionIndex) in actions" :key="actionIndex">
            <a @click="applyAction(action,item,index)" role="button" class="dropdown-item d-flex align-items-center rounded"
              :class="action.class">
              <i :class="action.icon" class="me-2"></i>
              {{ action.label }}
            </a>
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

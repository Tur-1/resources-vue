
<script setup>
import ResourceActionsMenu from "@/components/ResourceActionsMenu/index.vue";
import defaultImage from "./../default-image.jpg";
const props = defineProps(["columns", "data", "actions", "pages"]);
const emits = defineEmits(["openConfirm"]); 

 const getImageSource = (item, column) => {
  if (column.image && !column.field && !column.nestedField) {
        return defaultImage;
  }
  if (column.nestedField) {
    return item[column.field]?.[column.nestedField] || defaultImage;
  }
  
  return item[column.field];
};
const getValue = (item, column) => {
  if (column.nestedField) {
    return item[column.field]?.[column.nestedField];
  }
  return item[column.field];
};
const handleAction = (action, item, index) => {
  if (action.confirmAction) {
    emits("openConfirm", action, { item: item, index: index });
  } else {
    action.handle({ item, index });
  }
};

const generateRoute = (page, item) => {
  return {
    name: page.routeName,
    params: {
      [page.routeParam]: item[page.routeParam] || item.id,
    },
  };
};
 
</script>

<template>
  <TransitionGroup name="list">
    <tr
      v-for="(item, index) in props.data"
      :key="item.id"
    >
      <td v-for="column in columns" :key="column.id">
        <span class="fw-normal"  v-if="!column?.action && !column?.image" :class="column.class">
          {{ getValue(item,column) }}
        </span>
        <img
          v-if="column?.image"
          :src="getImageSource(item,column)"
          :alt="defaultImage"
          :class="column.class"
          class="img-thumbnail"
          style="max-width: 80px; max-height: 80px"
        />

        <ResourceActionsMenu
          v-if="column?.action && actions.length"
        >
          <template
            v-for="(actionPage, pageIndex) in props.pages"
            :key="pageIndex"
          >
            <RouterLink
              :class="actionPage.class"
              class="dropdown-item d-flex align-items-center rounded text-dark"
              :to="generateRoute(actionPage, item)"
            >
              <i :class="actionPage.icon" class="me-2"></i>
              {{ actionPage.label }}
            </RouterLink>
          </template>
          <hr class="actions-hr" />
          <template v-for="(action, actionIndex) in actions" :key="actionIndex">
            <a
              @click="handleAction(action, item, index)"
              role="button"
              class="dropdown-item d-flex align-items-center rounded"
              :class="action.class"
            >
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
.actions-hr{
  margin: 5px !important;
  color: #ccc !important;
}
</style>

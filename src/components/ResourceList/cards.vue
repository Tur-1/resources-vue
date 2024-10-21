<template>
  <div class="row" v-if="displayLabel">
    <div
      v-for="(item, index) in props.data"
      :key="item.id"
      class="col-12 col-md-4 col-lg-4 col-xl-3 mb-4"
    >
      <div class="card">
        <div
          class="p-2"
          v-if="columns.find((col) => col.image)"
        >
          <img
            :src="getImageSource(item, columns.find((col) => col.image))"
            class="card-img-top rounded w-full"
            alt="Card Image"
            style="height: 200px; object-fit: cover; object-position: center"
          />
        </div>
        <div class="card-body p-2" >
        <template v-for="column in columns"> 
          <div class="d-flex gap-2 mb-2" v-if="!column?.action && !column?.image" >
            <span >
                {{ column.label }}:
            </span>
            <span :class="column.class">
              {{ getValue(item, column) }}
            </span>
          </div>
          <ResourceActionsMenu class="text-end"
          v-if="column?.action && !column?.image && actions.length"
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
        </template>
        </div>
      </div>
    </div> 
  </div>
  <div class="row" v-else>
    <div
      v-for="(item, index) in props.data"
      :key="item.id"
      class="col-12 col-md-4 col-lg-4 col-xl-3 mb-4"
    >
      <div class="card">
        <div
          class="p-2"
          v-if="columns.find((col) => col.image)"
        >
          <img
            :src="getImageSource(item, columns.find((col) => col.image))"
            class="card-img-top rounded w-full"
            alt="Card Image"
            style="height: 200px; object-fit: cover; object-position: center"
          />
        </div>
        <div class="card-body p-2" >
        <template v-for="column in columns"> 
          <div class="d-flex gap-2 mb-2" v-if="!column?.action && !column?.image" > 
            <span :class="column.class">
              {{ getValue(item, column) }}
            </span>
          </div>
          <ResourceActionsMenu class="text-end"
          v-if="column?.action && !column?.image && actions.length"
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
              {{ actionPage.label ? actionPage.label : actionPage.title }}
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
        </template>
        </div>
      </div>
    </div> 
  </div>
</template>

<script setup>
import ResourceActionsMenu from "@/components/ResourceActionsMenu/index.vue";
import defaultImage from "./default-image.jpg";
const props = defineProps(["columns", "data", "actions", "pages", 'displayLabel']);
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
<style scoped>

.actions-hr{
  margin: 5px !important;
  color: #ccc !important;
}
</style>

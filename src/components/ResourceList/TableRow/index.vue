<template>
  <TransitionGroup name="list">
    <tr v-for="(item, index) in props.data" :key="item.id" @click="navigateToShow(item)">
      <td v-for="column in columns" :key="column.id">
        <span class="fw-normal" v-if="!column?.action && !column?.image">
          {{ item[column.field] }}
        </span>
        <img v-if="column?.image" :src="item[column.field] || defaultImage" :alt="item[column.field] || defaultImage"
          class="img-thumbnail" style="max-width: 100px; max-height: 100px" />
        <ResourceActionsMenu v-if="column?.action && actions.length">
          <template v-for="(actionPage, pageIndex) in pagesRoutes" :key="pageIndex">
            <RouterLink :class="actionPage.class" class="dropdown-item d-flex align-items-center rounded text-dark"
              :to="generateRoute(actionPage, item)">
              <i :class="actionPage.icon" class="me-2"></i>
              {{ actionPage.label ? actionPage.label : actionPage.title }}
            </RouterLink>
          </template>
          <hr class="dropdown-divider" />
          <template v-for="(action, actionIndex) in actions" :key="actionIndex">
            <a @click="handleAction(action, item, index)" role="button"
              class="dropdown-item d-flex align-items-center rounded" :class="action.class">
              <i :class="action.icon" class="me-2"></i>
              {{ action.label }}
            </a>
          </template>
        </ResourceActionsMenu>
      </td>
    </tr>
  </TransitionGroup>
</template>

<script setup>
import ResourceActionsMenu from "@/components/ResourceActionsMenu/index.vue";
import useResourceQueryString from "./../../../composables/useResourceQueryString.js";

import { onMounted } from "vue";
import defaultImage from "./default-image.jpg";
const props = defineProps(["columns", "data", "actions", "pages"]);
const emits = defineEmits(["openConfirm"]);

const queryString = useResourceQueryString();

const handleAction = (action, item, index) =>
{
  if (action.isConfirmAction)
  {
    emits("openConfirm", action, { item: item, index: index });
  } else
  {
    action.handle({ item, index });
  }
};

const pagesRoutes = Object.entries(props.pages)
  .filter(([key, value]) => key !== "create")
  .map(([key, value]) => value);

const showPage = Object.entries(props.pages)
  .filter(([key, value]) => key == "show")
  .map(([key, value]) => value)[0];

const navigateToShow = (item) =>
{
  if (showPage) return;
  const route = generateRoute(showPage, item);
  queryString.redirect(route);
};
const generateRoute = (page, item) =>
{
  return {
    name: page.routeName,
    params: {
      [page.routeParam]: item[page.routeParam] || item.id,
    },
  };
};
</script>
<style scoped>
td {
  vertical-align: middle !important;
}

tr {
  cursor: pointer;
}
</style>

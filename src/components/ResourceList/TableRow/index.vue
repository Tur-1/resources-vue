<template>
  <TransitionGroup name="list">
    <tr v-for="(item, index) in props.data" :key="item.id">
      <td v-for="column in columns" :key="column.id">
        <span class="fw-normal" v-if="column.field !== 'Actions'">
          {{ item[column.field] }}
        </span>

        <ResourceActionsMenu v-if="column.field === 'Actions' && actions.length">
          <template v-for="(page, pageIndex) in pagesRoutes" :key="pageIndex">
            <RouterLink
              :class="page.resource.class"
              class="dropdown-item d-flex align-items-center rounded text-dark"
              :to="generateRoute(page, item)"
            >
              <i :class="page.resource.icon" class="me-2"></i>
              {{ page.resource.label ? page.resource.label : page.meta.title }}
            </RouterLink>
          </template>
          <hr class="dropdown-divider" />
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

<script setup>
import ResourceActionsMenu from '@/components/ResourceActionsMenu/index.vue'
import { onMounted } from 'vue'

const props = defineProps(['columns', 'data', 'actions', 'pages'])
const emits = defineEmits(['openConfirm'])

const handleAction = (action, item, index) => {
  if (action.isConfirmAction) {
    emits('openConfirm', action, { item: item, index: index })
  } else {
    action.handle({ item, index })
  }
}

const pagesRoutes = props.pages?.filter((page) => page.resource)

const generateRoute = (page, item) => {
  return {
    name: page.name,
    params: {
      [page.resource.paramKey]: item[page.resource.paramKey] || item.id
    }
  }
}
</script>

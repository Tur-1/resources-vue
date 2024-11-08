<template>
  <SidebarMenu>
  
    <template v-for="(item, index) in items" :key="index">
      <MenuSection
        v-if="item.isSection"
        :title="item.labelItem"
        :icon="item.iconItem"
        :links="item.items"
        :route="route"
      />

      <MenuLink
        v-else
        :title="item.labelItem"
        :to="item.to"
        :icon="item.iconItem"
         :route="route"
      />
    </template>
<!-- 
    <MenuSection
      title="Users"
      icon="fa-solid fa-users"
      :links="[
        { title: 'Users', to: 'users' },
        { title: 'create user', to: 'users.create' },
      ]"
    />

    <MenuSection
      title="Admins"
      icon="fa-solid fa-users"
      :links="[
        { title: 'Admins', to: 'admins' },
        { title: 'create admin', to: 'admins.create' },
      ]"
    /> -->
  </SidebarMenu>
</template>

<script setup>
import SidebarMenu from "./SidebarMenu/index.vue";
import MenuLink from "./SidebarMenu/MenuLink.vue";
import MenuSection from "./SidebarMenu/MenuSection.vue";
const props = defineProps(["items","route"]);
</script>

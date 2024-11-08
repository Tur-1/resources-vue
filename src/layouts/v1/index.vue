<template>
  <main class="content">
    <DesktopNavbar />
    <Sidebar :items="items" :route="route" />
    <section class="main-content">
      <slot />
    </section>
  </main>
</template>

<script setup>
import DesktopNavbar from "@/layouts/v1/DesktopNavbar.vue";
import Sidebar from "@/layouts/v1/Sidebar.vue";
import { onMounted } from "vue";

const props = defineProps(["items", "route"]);

 
</script>
 
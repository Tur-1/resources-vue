<script setup>
import GlobalSearch from './Navbar/GlobalSearch.vue'
import NavNotifications from './Navbar/NavNotifications.vue'
import NavUser from './Navbar/NavUser.vue'
</script>

<template>
  <nav class="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
    <div class="container-fluid px-0">
      <div class="d-flex justify-content-between w-100" id="navbarSupportedContent">
        <GlobalSearch />
        <!-- Navbar links -->
        <ul class="navbar-nav align-items-center">
          <NavNotifications />
          <NavUser />
        </ul>
      </div>
    </div>
  </nav>
</template>

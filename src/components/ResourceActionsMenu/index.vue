<template>
  <div class="dropdown">
    <button
      class="btn btn-light dropdown-toggle shadow-sm"
      type="button"
      id="dropdownMenuButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="bi bi-three-dots"></i>
    </button>
    <ul class="dropdown-menu actions-dropdown-menu" aria-labelledby="dropdownMenuButton">
      <slot />
    </ul>
  </div>
</template>
<style scoped>
.actions-dropdown-menu{
  border: 1px solid #f0f0f0;
}
#dropdownMenuButton{
  border: 1px solid #cccccc75 !important;
}
</style>
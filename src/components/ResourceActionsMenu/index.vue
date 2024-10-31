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
    <ul
      class="dropdown-menu resource-dropdown-menu"
      aria-labelledby="dropdownMenuButton"
    >
      <slot />
    </ul>
  </div>
</template>
<style scoped>
 
#dropdownMenuButton {
  border: 1px solid #cccccc75 !important;
  padding: 3px 14px !important;
}

.dropdown-toggle::after {
  display: none !important;
  content: none !important;
}
</style>

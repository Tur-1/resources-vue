<template>
  <div class="row">
    <div
      v-for="i in 16"
      :key="i"
      class="col-12 col-md-4 col-lg-4 col-xl-3 mb-4"
    >
      <div class="card">
        <div class="card-body p-2 placeholder-wave">
        <div class=" mb-2">
          <span class="placeholder col-6"></span>
        </div>
        <div class=" mb-2">
          <span class="placeholder col-9"></span>
        </div>
        <div class=" mb-2">
          <span class="placeholder col-3"></span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["columnsLength"]);
</script>

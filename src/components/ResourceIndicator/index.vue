<template>
  <div class="LoadingSpinner" v-if="useResourceIndicator.isOnProgress">
    <div class="spinner-box">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import useResourceIndicator from './useResourceIndicator.js'
</script>
<style>
@import './resource-indicator.css';
</style>
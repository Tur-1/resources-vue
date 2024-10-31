<script setup>
import useResourceNotification from "./useResourceNotification";
</script>
<template>
  <Transition name="slide-fade">
    <div
      v-if="useResourceNotification.isOpen"
      id="toast-alert"
      :class="useResourceNotification.className"
      class="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex align-items-center justify-content-between">
        <div class="toast-body text-white">
          <span
            style="margin-right: 10px; font-size: 18px; cursor: pointer;"
            @click="useResourceNotification.close()"
            class="text-white"
          >
            <i :class="useResourceNotification.icon" />
          </span>
          {{ useResourceNotification.message }}
        </div>
      </div>
    </div>
  </Transition>
</template>
<style>
@import "./toast.css";
</style>

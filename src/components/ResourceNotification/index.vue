

<script setup>
import useResourceNotification from './useResourceNotification'
</script>
<template>
  <Transition name="slide-fade">
    <div
      v-if="useResourceNotification.isOpen"
      id="toast-alert"
      :class="useResourceNotification.isError ? 'toast-error' : 'toast-success'"
      class="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex align-items-center justify-content-between">
        <div class="toast-body">
          <span style="margin-right: 10px; font-size: 18px">
            <i
              class="bi bi-check-circle-fill text-white"
              v-show="!useResourceNotification.isError"
            />
            <i class="bi bi-x-circle-fill" v-show="useResourceNotification.isError" />
          </span>
          {{ useResourceNotification.message }}
        </div>
      </div>
    </div>
  </Transition>
</template>
<style>
@import './toast.css';
</style>
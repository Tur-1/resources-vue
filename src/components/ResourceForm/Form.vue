<template>
  <div class="resource-form">
    <div class="header">
      <h4>{{ title }}</h4>
    </div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <div class="card border-1 p-2 pb-4 mb-4">
        <div class="card-body p-0 p-md-4">
          <slot />
        </div>
      </div>

      <div class="d-flex justify-content-end">
        <button class="btn resource-form-btn btn-gray-800 me-3" type="submit">
          <span>{{ "cancel" }}</span>
        </button>
        <button
          class="btn resource-form-btn btn-gray-800"
          type="submit"
          :disabled="useResourceIndicator.isOnProgress"
        >
          <span>{{ submitTitle ?? "save" }}</span>
        </button>
      </div>
    </form>
  </div>

  <ResourceIndicator />
  <ResourceNotification />
</template>

<script setup>
import useResourceIndicator from "@/components/ResourceIndicator/useResourceIndicator";
import ResourceIndicator from "@/components/ResourceIndicator/index.vue";
import { reactive, provide, watch } from "vue";
import ResourceNotification from "@/components/ResourceNotification/index.vue";
import { useResourceNotification } from "@/index";
const props = defineProps({
  title: String,
  submitTitle: String,
  submit: {
    type: Function,
    required: true,
  },
  class: String,
  data: Object,
});

let formData = reactive({});
let errors = reactive({});
watch(
  () => props.data,
  (newValue) => {
    Object.assign(formData, newValue);
  },
  { deep: true }
);

provide("formContext", formData);
provide("errors", errors);

const handleSubmit = async () => {
  useResourceIndicator.show();
  try {
    await props.submit(formData);
  } catch (error) {
    useResourceNotification.error(error.message);
    if (error.response && error.response.data.errors) {
      Object.assign(errors, error.response.data.errors);
    }
  } finally {
    useResourceIndicator.hide();
  }
};
</script>
<style>
@import "./resource-form.css";
</style>

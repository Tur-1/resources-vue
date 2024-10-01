<script setup>
import useResourceIndicator from "@/components/ResourceIndicator/useResourceIndicator";
import ResourceIndicator from "@/components/ResourceIndicator/index.vue";
import { reactive, provide, watch } from "vue";
import ResourceNotification from "@/components/ResourceNotification/index.vue";
import {  useResourceNotification } from "@/index";
import ResourceApi from "./../../api/ResourceApi";

const props = defineProps({
  title: String, 
  submitTitle: String,
  submit: {
    type: [String, Function],
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
    if (newValue) {
      Object.assign(formData, newValue);
    } else {
      Object.keys(formData).forEach((key) => {
        formData[key] = "";
      });
    }
  },
  { deep: true, immediate: true }
);
provide("formContext", formData);
provide("errors", errors);

const handleSubmit = async () => {
  useResourceIndicator.show();
  try {
    if (typeof props.submit === "function") {
      await props.submit(formData);
    }  
    if (typeof props.submit === "string") {
      await ResourceApi(props.submit).post();
    }

    if (props.data) {
      Object.assign(formData, props.data);
    } else {
      Object.keys(formData).forEach((key) => {
        formData[key] = "";
      });
    }
  } catch (error) {
    if (error.response && error.response.data.errors) {
      useResourceNotification.error(error.message);
      Object.assign(errors, error.response.data.errors);
    }
  } finally {
    useResourceIndicator.hide();
  }
};
</script>
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

<style>
@import "./resource-form.css";
</style>

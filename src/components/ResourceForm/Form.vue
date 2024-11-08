<script setup>
import useResourceIndicator from "@/components/ResourceIndicator/useResourceIndicator";
import ResourceIndicator from "@/components/ResourceIndicator/index.vue";
import { reactive, provide, watch, ref } from "vue";
import ResourceNotification from "@/components/ResourceNotification/index.vue";
import useResourceNotification from "@/components/ResourceNotification/useResourceNotification";
import useResourceApi from "@/api/useResourceApi";
import { getRouter } from "@/composables/useResourceRouter";

const props = defineProps({
  title: String,
  submitTitle: String,
  submit: {
    type: [String, Function],
    required: true,
  },
  class: String,
  values: Object,
  redirectAfterSubmit: [String, Object],
});

let formData = reactive({});
let errors = reactive({});

provide("formContext", formData);
provide("errors", errors);

const router = getRouter()?.value;

watch(
  () => props.values,
  (newValue) =>
  {
    if (newValue)
    {
      Object.assign(formData, newValue);
    } else
    {
      Object.keys(formData).forEach((key) =>
      {
        formData[key] = "";
      });
    }
  },
  { deep: true, immediate: true }
);
const submitActions = {
  function: async () => await props.submit(formData),
  string: async () => await useResourceApi().post(props.submit, formData),
};
const redirectActions = {
  string: (route) => router.push({ name: props.redirectAfterSubmit }),
  object: (route) => router.push(props.redirectAfterSubmit),
};
const handleSubmit = async () =>
{

  const submitAction = submitActions[typeof props.submit];
  const redirect = redirectActions[typeof props.redirectAfterSubmit];

  useResourceIndicator.show();

  try
  {
    await submitAction();

    if (props.values)
    {
      Object.assign(formData, props.values);
    }

    clearErrors();
    
    if (router)
    {
      redirect();
    }

  } catch (error)
  {
    if (error.response && error.response.data.errors)
    {
      useResourceNotification.error(error.message);
      Object.assign(errors, error.response.data.errors);
    }
  } finally
  {
    useResourceIndicator.hide();
  }
};

const clearErrors = () =>
{
  Object.keys(errors).forEach((key) =>
  {
    errors[key] = "";
  });
}
</script>
<template>
  <div class="resource-form" :class="class">
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <div class="header">
        <h4>{{ title }}</h4>
      </div>
      <div class="card border-1 p-2 pb-4 mb-4">
        <div class="card-body p-0 p-md-4">
          <slot />
        </div>
      </div>

      <div class="d-flex justify-content-end">
        <button class="resource-form-btn btn btn-primary text-white d-inline-flex align-items-center bg-dark border-0"
          type="submit" :disabled="useResourceIndicator.isOnProgress">
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

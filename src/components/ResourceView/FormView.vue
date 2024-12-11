<template>
  <div class="resource-form">
    <form enctype="multipart/form-data" @submit.prevent="submit">
      <div class="card border-1 p-2 pb-4 mb-4">
        <div class="card-body p-0 p-md-4">
          <div   v-for="field in resourceForm.formFields"
          :key="field.fieldName" class="mb-2" :class="field.fieldClass">
            <label v-if="field.fieldLabel" :for="field.fieldName" class="form-input-label">
              {{ field.fieldLabel }}
              <span v-if="field.fieldRequired" class="text-danger">*</span>
            </label>
            <input
              class="form-control"
              :class="{ 'is-invalid':errors[field.fieldName] }" 
              v-model="formData[field.fieldName]"
              :type="field.fieldType"
              :required="field.fieldRequired"
              :id="field.fieldName"
              :placeholder="field.fieldPlaceholder"
            />
            <span
              class="text-danger mt-1 ms-2 row"
              v-if="errors[field.fieldName]"
              style="font-size: 12px"
            >
              {{ errors[field.fieldName][0] }}
            </span>
          </div>
          
        </div>
      </div>

      <div class="d-flex justify-content-end">
        <button
          class="resource-form-btn btn btn-primary text-white d-inline-flex align-items-center bg-dark border-0"
          type="submit"
          :disabled="useResourceIndicator.isOnProgress"
        >
          <span>{{
            resource.currentPage.type === "edit" ? "update" : "create"
          }}</span>
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
import { reactive, watch, ref, onMounted } from "vue";
import ResourceNotification from "@/components/ResourceNotification/index.vue";
import useResourceNotification from "@/components/ResourceNotification/useResourceNotification";
import useResourceApi from "@/api/useResourceApi";
import { getRouter } from "@/composables/useResourceRouter";

let formData = reactive({});
let errors = reactive({});

const props = defineProps(["resource"]);
const route = getRouter().value.currentRoute;

let resourceForm = ref(props.resource.form(route));

onMounted(async () => {
  const data = props.resource.currentPage.type == "edit" ? await resourceForm.value.getData() : [];
  resourceForm.value.formFields.forEach((field) => {
    formData[field.fieldName] = data[field.fieldName] || "";
  });
});

async function submit() {
  useResourceIndicator.show();

  try {
    if (props.resource.currentPage.type == "edit") {
      await resourceForm.value.FormUpdateSubmit(formData);
    } else {
      await resourceForm.value.FormCreateSubmit(formData);
    }

    clearErrors();
  } catch (error) {
    if (error.response && error.response.data.errors) {
      useResourceNotification.error(error.message);
      Object.assign(errors, error.response.data.errors);
    }
  } finally {
    useResourceIndicator.hide();
  }
}
const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
};
</script>

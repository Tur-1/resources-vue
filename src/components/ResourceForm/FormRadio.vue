<script setup>
import { computed, inject } from "vue";

const props = defineProps({
  id: String,
  required: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: "radio",
  },
  value: [String, Number, Boolean], 
  name: String, 
  placeholder: String,
  label: String,
  error: String,
  class: String,
  checked: Boolean,
});

const errors = inject("errors", {});
 
const model = defineModel();
 
const inputID = computed(() => props.id ?? props.value);
 
const isChecked = computed(() => props.checked ? model.value = props.value : false);
</script>

<template>
  <div class="mb-2" :class="class">
    <div class="form-check w-100">
      <input
        :class="{ 'is-invalid': error || errors[props?.name] }"
        class="form-check-input"
        :type="type"
        :id="inputID"
        :value="value"
        :checked="isChecked"
        :name="name"
        v-model="model"
      />
      <label v-if="label" :for="inputID" class="form-check-label">
        {{ label }}
        <span v-if="required" class="text-danger">*</span>
      </label>
    </div>
    <span
      class="text-danger mt-1 ms-2 row"
      v-if="error || errors[props?.name]"
      style="font-size: 12px"
    >
      {{ error || errors[props.name][0] }}
    </span>
  </div>
</template>

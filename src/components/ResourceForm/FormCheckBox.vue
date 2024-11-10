
<script setup>
import { inject, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  id: String,
  required: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: "checkbox",
  },
  value: [String, Number, Boolean],
  name: String,
  placeholder: String,
  label: String,
  error: String,
  class: String,
  checked: Boolean,
  modelValue: [Array, String, Number, Boolean], // For v-model support
});

const emit = defineEmits(["update:modelValue", "change"]);

// Inject form context if available
const formContext = inject("formContext", null);

// Determine if the checkbox is checked
const isChecked = computed(() => {
  // If v-model is used, rely on modelValue for checked state
  if (props.modelValue !== undefined) {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue.includes(props.value);
    }
    return props.modelValue === props.value;
  }

  // Otherwise, rely on formContext and props.name
  if (formContext && props.name && Array.isArray(formContext[props.name])) {
    return formContext[props.name].includes(props.value);
  }

  return props.checked; // Default fallback
});

// Handle checkbox toggle
const toggleValue = (event) => {
  const checked = event.target.checked;

  if (props.modelValue !== undefined) {
    // If v-model is used, emit the updated value
    if (Array.isArray(props.modelValue)) {
      const updatedValue = checked
        ? [...props.modelValue, props.value]
        : props.modelValue.filter((v) => v !== props.value);
      emit("update:modelValue", updatedValue);
    } else {
      emit("update:modelValue", checked ? props.value : null);
    }
  } else if (formContext && props.name) {
    // Otherwise, update formContext
    if (!Array.isArray(formContext[props.name])) {
      formContext[props.name] = [];
    }

    const index = formContext[props.name].indexOf(props.value);

    if (checked && index === -1) {
      formContext[props.name].push(props.value);
    } else if (!checked && index !== -1) {
      formContext[props.name].splice(index, 1);
    }
  }

  // Emit change event for additional handling
  emit("change", checked);
};
</script>

<template>
  <div class="mb-2" :class="class">
    <div class="form-check w-100">
      <input
        :class="{ 'is-invalid': error }"
        class="form-check-input"
        :type="type"
        :id="id"
        :value="value"
        :checked="isChecked"
        @change="toggleValue"
      />
      <label v-if="label" :for="id" class="form-check-label">
        {{ label }}
        <span v-if="required" class="text-danger">*</span>
      </label>
    </div>
    <span
      class="text-danger mt-1 ms-2 row"
      v-if="error"
      style="font-size: 12px"
    >
      {{ error }}
    </span>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  id: String,
  options: [Object, Array],
  name: String,
  label: String,
  error: String,
  class: String,
  modelValue: [String, Number],
  required: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const formContext = inject('formContext', null)

const localValue = computed({
  get() {
    // If formContext exists, use it; otherwise, use modelValue from v-model
    return formContext?.[props.name] ?? props.modelValue
  },
  set(value) {
    if (formContext) {
      formContext[props.name] = value
    }
    emit('update:modelValue', value)
    emit('change', value)
  }
})
</script>

<template>
  <div class="form-group mb-2" :class="class">
    <label v-if="label" :for="id" class="form-input-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <select
      :id="id"
      :name="name"
      v-model="localValue"
      :class="{ 'is-invalid': error }"
      class="form-select"
    >
      <option value="">-</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span class="text-danger mt-1 ms-2" v-if="error" style="font-size: 12px">
      {{ error }}
    </span>
  </div>
</template>

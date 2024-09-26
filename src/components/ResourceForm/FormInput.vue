<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  id: String,
  required: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'text'
  },
  name: String,
  placeholder: String,
  label: String,
  error: String,
  class: String,
  step: String,
  modelValue: [String, Number]
})

const emit = defineEmits(['update:modelValue'])

const formContext = inject('formContext', null)
const errors = inject('errors');
const localValue = computed({
  get() {
    return formContext?.[props.name] ?? props.modelValue
  },
  set(value) {
    if (formContext) {
      formContext[props.name] = value
    }
    emit('update:modelValue', value)
  }
})

const updateValue = (value) => {
  localValue.value = value
}
</script>

<template>
  
  <div v-if="type == 'radio' || type == 'checkbox'" class="mb-2" :class="class">
    <div class="form-check w-100">
      <input
        :class="{ 'is-invalid': error }"
        class="form-check-input"
        :type="type"
        :id="id"
        :name="name"
        :value="localValue"
        @input="updateValue($event.target.value)"
      />
      <label v-if="label" :for="id" class="form-check-label">
        {{ label }}
        <span v-if="required" class="text-danger">*</span>
      </label>
    </div>
    <span class="text-danger mt-1 ms-2 row" v-if="error" style="font-size: 12px">
      {{ error }}
    </span>
    <span class="text-danger mt-1 ms-2 row" v-if="errors[props.name]" style="font-size: 12px">
      {{ errors[props.name][0] }}
    </span>
  </div>

  <div v-else-if="type === 'search'">
    <label v-if="label" :for="id" class="form-input-label">
      {{ label }}
    </label>
    <div class="resource-search">
      <input
        class="form-control"
        :class="{ 'is-invalid': error }"
        :type="type"
        :placeholder="placeholder ?? 'search'"
        :id="id"
        :name="name"
        :value="localValue"
        @input="updateValue($event.target.value)"
        :aria-describedby="id"
        :step="step"
      />
      <span v-if="type == 'search'" class="resource-search-btn">
        <i class="bi bi-search"></i>
      </span>
    </div>
  </div>
  <div v-else class="mb-2" :class="class">
    <label v-if="label" :for="id" class="form-input-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>
    <input
      class="form-control"
      :class="{ 'is-invalid': error }"
      :type="type"
      :placeholder="placeholder"
      :id="id"
      :name="name"
      :value="localValue"
      @input="updateValue($event.target.value)"
      :aria-describedby="id"
      :step="step"
    />

    <span class="text-danger mt-1 ms-2 row" v-if="error" style="font-size: 12px">
      {{ error }}
    </span>
    <span class="text-danger mt-1 ms-2 row" v-if="errors[props.name]" style="font-size: 12px">
      {{ errors[props.name][0] }}
    </span>
  </div>
</template>

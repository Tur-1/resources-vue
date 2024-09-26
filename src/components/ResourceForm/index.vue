<template>
  <Form
    v-if="props.type === 'form'"
    :title="props.title"
    :submitTitle="props.submitTitle"
    :submit="props.submit"
    :class="props.class"
  >
    <slot />
  </Form>

  <FormInput
    v-if="inputTypes.includes(props.type)"
    v-model="localValue"
    :id="props.id"
    :name="props.name"
    :type="props.type"
    :placeholder="props.placeholder"
    :label="props.label"
    :error="props.error"
    :class="props.class"
  />

  <FormSelect
    v-if="props.type === 'select'"
    @change="emitChange"
    :label="props.label"
    :error="props.error"
    :class="props.class"
    v-model="localValue"
    :id="props.id"
    :name="props.name"
    :options="props.options"
  />
</template>

<script setup>
import Form from '@/components/ResourceForm/Form.vue'
import FormInput from '@/components/ResourceForm/FormInput.vue'
import FormSelect from '@/components/ResourceForm/FormSelect.vue'
import { watchEffect, computed } from 'vue'
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
  title: String,
  submitTitle: String,
  submit: Function,
  options: [Object, Array],
  modelValue: [String, Number] // modelValue for v-model support
})

const emit = defineEmits(['update:modelValue', 'change'])
const localValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value) // For v-model
    emit('change', value)
  }
})
let inputTypes = [
  'text',
  'number',
  'email',
  'password',
  'tel',
  'url',
  'search',
  'date',
  'datetime-local',
  'month',
  'week',
  'time',
  'checkbox',
  'radio',
  'range',
  'color',
  'file'
]

watchEffect(() => {
  if (props.type === 'form' && typeof props.submit !== 'function') {
    console.error(
      "Error ResourceForm: The 'submit' prop is required and must be a function when the 'type' is set to 'form'."
    )
  }
})

const emitChange = (value) => {
  emit('change', value)
}
</script>
<style>
@import './resource-form.css';
</style>
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
    v-else
    v-model="inputModel"
    :id="props.id"
    :name="props.name"
     @change="emitChange"
    :type="props.type"
    :placeholder="props.placeholder"
    :label="props.label" 
    :error="props.error"
    :value="props.value"
    :class="props.class"
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
  value:String,
  step: String,
  title: String,
  submitTitle: String,
  submit: Function,
  options: [Object, Array],
  modelValue: [String, Number] // modelValue for v-model support
})

const inputModel = defineModel();

// const localValue = computed({
//   get() {
//     return props.modelValue ?? props.value
//   },
//   set(value) {
//     emit('update:modelValue', value) // For v-model
//     emit('change', value)
//   }
// })

watchEffect(() => {
  if (props.type === 'form' && typeof props.submit !== 'function') {
    console.error(
      "Error ResourceForm: The 'submit' prop is required and must be a function when the 'type' is set to 'form'."
    )
  }
})

const emit = defineEmits(['change'])

const emitChange = (value) => {
  emit('change', value)
}
</script>
<style>
@import './resource-form.css';
</style>
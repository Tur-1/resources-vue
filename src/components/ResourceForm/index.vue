<template>
  <Form
    v-if="props.type === 'form'"
    :title="props.title"
    :submitTitle="props.submitTitle"
    :submit="props.submit" 
    :class="props.class"
    :redirectAfterSubmit="props.redirectAfterSubmit"
  >
    <slot />
  </Form>
 
  <FormSelect
     v-else-if="type === 'select'"
    v-model="model"
    :id="props.id"
    :name="props.name" 
    :placeholder="props.placeholder"
    :label="props.label"
    :error="props.error"
    :class="props.class"
     :options="props.options"
  />
  <FormInput
    v-else
    v-model="model"
    :id="props.id"
    :name="props.name"
    :type="props.type"
    :placeholder="props.placeholder"
    :label="props.label"
    :error="props.error"
    :class="props.class"
  />

</template>

<script setup>
import Form from '@/components/ResourceForm/Form.vue'
import FormInput from '@/components/ResourceForm/FormInput.vue' 
import FormSelect from '@/components/ResourceForm/FormSelect.vue';
import { ref,  computed, inject } from 'vue'
const props = defineProps({
  id: String, 
  name: String,
  placeholder: String,
  label: String,
  error: String,
  class: String,
  title: String,
  redirectAfterSubmit: [String, Object],
  submitTitle: String,
  submit: [String, Function],
  options: [Object, Array,Function],
  modelValue: [String, Number],
  required: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'text'
  }, 
})

const emit = defineEmits(['update:modelValue'])
const formData = inject('formContext', null)
const model = computed({
  get: () => {
    if (props.modelValue !== undefined) {
      return props.modelValue
    }
    return formData ? formData[props.name] : ''
  },
  set: (value) => {

    if (props.modelValue !== undefined) {
      emit('update:modelValue', value) 
    } 
    
    if (formData && props.name !== undefined) {
      formData[props.name] = value
    } 
    
  }
})


</script>
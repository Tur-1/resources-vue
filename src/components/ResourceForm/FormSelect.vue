<script setup>
import { inject, computed, onMounted, reactive, ref } from 'vue'

const props = defineProps({
  id: String,
  options: {
    type:[Object, Array] 
  },
  name: String,
  label: String,
  error: String,
  class: String,
  value:String,
  modelValue: [String, Number],
  required: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'change'])
const errors = inject('errors', {});
const formContext = inject('formContext', null)
if (props.value) {
  formContext[props.name] = props.value
}
 
const localValue = computed({
  get()
  {
    return  formContext[props.name] ?? props.modelValue ?? props.value;

  },
  set(value)
  {
    if (formContext)
    {
      formContext[props.name] = value
    }
    emit('update:modelValue', value)
    emit('change', value)
  }
})

let computedOptions = computed(() => {
  if (Array.isArray(props.options)) {
    return props.options.map(option => ({
      label: option.label || option, 
      value: option.value || option,
    }));
  } 
   if (props.options && props.options.data) {
    return props.options.data.map(item => ({
      label: item[props.options.label],
      value: item[props.options.value],
    }));
  }
  
  return [];
});
</script>

<template>
  <div class="form-group mb-2" :class="class">
    <label v-if="label" :for="id" class="form-input-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <select :id="id" :name="name" v-model="localValue"  :value="localValue" :class="{ 'is-invalid': error }" class="form-select">
      <option value="">-</option>
      <option v-for="option in computedOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span class="text-danger mt-1 ms-2 row" v-if="error" style="font-size: 12px">
      {{ error }}
    </span>
    <span class="text-danger mt-1 ms-2 row" v-if="errors[props?.name]" style="font-size: 12px">
      {{ errors[props.name][0] }}
    </span>
  </div>
</template>

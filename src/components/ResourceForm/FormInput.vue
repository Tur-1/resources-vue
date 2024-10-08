
 

<script setup>
import { inject, computed ,watch} from 'vue'

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
  modelValue: [String, Number],
   options: [Object, Array],
})

const emit = defineEmits(['update:modelValue','change'])

const formContext = inject('formContext', null)


const errors = inject('errors', {});

watch(() => props.modelValue, (newVal) => {
  if (formContext) {
    formContext[props.name] = newVal;
  }
});
watch(()=>props.value,(value)=> {
  formContext[props.name] = value;
})
const localValue = computed({
  get() {
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

const updateValue = (value) => {
  localValue.value = value
}
 
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
    <span class="text-danger mt-1 ms-2" v-if="error" style="font-size: 12px">
      {{ error }}
    </span>
    <span class="text-danger mt-1 ms-2 row" v-if="errors[props?.name]" style="font-size: 12px">
      {{ errors[props.name][0] }}
    </span>
  </div>
  <div v-else-if="type === 'select'" class="form-group mb-2" :class="class">
    <label v-if="label" :for="id" class="form-input-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <select :id="id" :name="name"  :value="localValue"
    @change="updateValue($event.target.value)" :class="{ 'is-invalid': error }" class="form-select">
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
    />

    <span class="text-danger mt-1 ms-2" v-if="error" style="font-size: 12px">
      {{ error }}
    </span>
    <span class="text-danger mt-1 ms-2 row" v-if="errors[props?.name]" style="font-size: 12px">
      {{ errors[props.name][0] }}
    </span>
  </div>
</template>
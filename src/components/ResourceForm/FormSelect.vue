<template>
  <div class="form-group mb-2" :class="class">
    <label v-if="label" :for="id" class="form-input-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <select
      :id="id"
      :name="name"
      v-model="model" 
      :class="{ 'is-invalid': error || errors[props?.name] }"
      class="form-select"
    >
      <option value="">-</option>
      <option
        v-for="option in computedOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <span
      class="text-danger mt-1 ms-2 row"
      v-if="error || errors[props?.name]"
      style="font-size: 12px"
    >
      {{ error || errors[props.name][0] }}
    </span>
  </div>
</template>

<script setup>
import { inject, computed, watch, ref, onMounted } from "vue";
const errors = inject("errors", {});

const props = defineProps({
  id: String,
  required: {
    type: Boolean,
    default: true,
  }, 
  name: String,
  placeholder: String,
  label: String,
  error: String,
  class: String,  
  modelValue: [String, Number],
  options: [Object, Array, Function],
});

  
const optionsState = ref([]);
const computedOptions = computed(() => optionsState.value);
const model = defineModel();

onMounted(async () => {  
 
    const fetchedOptions = await getOptions(await props.options);
    optionsState.value = fetchedOptions; 
});

async function getOptions(options) {
  if (typeof options === "object") {
    if (typeof options.data === "function") {
      options.data = await options.data();
    }

    if (Array.isArray(options.data)) {
      return options.data.map((item) => ({
        label: options?.label ? item[options.label] : item,
        value: options?.value ? item[options.value] : item,
      }));
    }
  }
  if (typeof options === "function") {
    
    options = await options();
    return options.map((option) => ({
      label: option,
      value: option,
    }));
  }

  if (Array.isArray(options)) {
    return options.map((option) => ({
      label: option,
      value: option,
    }));
  }

  return [];
}

</script>

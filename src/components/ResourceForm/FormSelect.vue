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
      :class="{ 'is-invalid': error }"
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
      v-if="error"
      style="font-size: 12px"
    >
      {{ error }}
    </span>
    <span
      class="text-danger mt-1 ms-2 row"
      v-if="errors[props?.name]"
      style="font-size: 12px"
    >
      {{ errors[props.name][0] }}
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
  options: [Object, Array, Function],
});
const optionsState = ref([]);

const computedOptions = computed(() => optionsState.value);
const model = defineModel() 
async function getOptions(options) {
  if (typeof options === "object") {
    if (typeof options.data === "function") {
      options.data = await options.data();
    }

    if (Array.isArray(options.data)) {
      return options.data.map((item) => ({
        label: options?.label ? item[options.label] : item.name || "",
        value: options?.value ? item[options.value] : item.value || "",
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

onMounted(async () => {  
   console.log(typeof props.options, props.options);
   
    const fetchedOptions = await getOptions(await props.options);
    optionsState.value = fetchedOptions; 
});
</script>

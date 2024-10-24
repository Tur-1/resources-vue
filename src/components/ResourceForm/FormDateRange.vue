<template>
  <div class="d-flex justify-content-between mb-2 gap-3">
    <div  :class="class" class="w-50">
      <label :for="name" class="form-input-label">
        From:
        <span v-if="required" class="text-danger">*</span>
      </label>
      <input
        class="form-control"
        :class="{ 'is-invalid': error }"
        type="date"
        :placeholder="placeholder"
        :id="id"
        v-model="model" 
        :name="name"
        :aria-describedby="id"
      />

      <span class="text-danger mt-1 ms-2" v-if="error" style="font-size: 12px">
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
    <div  :class="class" class="w-50">
      <label :for="name" class="form-input-label">
        To:
        <span v-if="required" class="text-danger">*</span>
      </label>
      <input
        class="form-control"
        :class="{ 'is-invalid': error }"
        type="date"
        :placeholder="placeholder"
        :id="id"
        v-model="model" 
        :name="name"
        :aria-describedby="id"
      />

      <span class="text-danger mt-1 ms-2" v-if="error" style="font-size: 12px">
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
  </div>
</template>

<script setup>
import { inject, computed, watch, ref, onMounted } from "vue";

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

const errors = inject("errors", {}); 
const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

</script>

<style lang="scss" scoped>

</style>
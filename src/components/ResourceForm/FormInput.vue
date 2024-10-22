<script setup>
import { inject, computed, watch, ref, onMounted } from "vue";

const props = defineProps({
  id: String,
  required: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: "text",
  },
  name: String,
  placeholder: String,
  label: String,
  error: String,
  class: String, 
  options: [Object, Array, Function],
});
 

const formContext = inject("formContext", null);

const errors = inject("errors", {});
 
const model = defineModel() 
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
        v-model="model"
      />
      <label v-if="label" :for="id" class="form-check-label">
        {{ label }}
        <span v-if="required" class="text-danger">*</span>
      </label>
    </div>
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

  <!-- <div v-else-if="type === 'date-range'" class="d-flex justify-content-between mb-2 gap-3">
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
        :name="name"
        :value="localValue"
        @input="updateValue($event.target.value)"
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
        :name="name"
        :value="localValue"
        @input="updateValue($event.target.value)"
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
  </div> -->

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
        v-model="model"
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
       v-model="model"
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
</template>

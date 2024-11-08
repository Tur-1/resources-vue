<template>
  <Form
    v-if="props.type === 'form'"
    :title="props.title"
    :submitTitle="props.submitTitle"
    :submit="props.submit"
    :class="props.class"
    :values="props.values"
    :redirectAfterSubmit="props.redirectAfterSubmit"
  >
    <slot />
  </Form>

  <FormCheckBox
    v-else-if="type == 'radio' || type == 'checkbox'"
    v-model="model"
    :id="props.id"
    :value="props.value"
    :name="props.name"
    :type="props.type"
    :placeholder="props.placeholder"
    :label="props.label"
    :error="props.error"
    :class="props.class"
  />
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
import Form from "@/components/ResourceForm/Form.vue";
import FormInput from "@/components/ResourceForm/FormInput.vue";
import FormSelect from "@/components/ResourceForm/FormSelect.vue";
import FormCheckBox from "@/components/ResourceForm/FormCheckBox.vue";
import { ref, computed, inject, watch } from "vue";
const props = defineProps({
  id: String,
  name: String,
  placeholder: String,
  label: String,
  error: String,
  class: String,
  title: String,
  values: Object,
  redirectAfterSubmit: [String, Object],
  submitTitle: String,
  submit: [String, Function],
  options: [Object, Array, Function],
  modelValue: [String, Number, Array,Boolean],
  value: [String, Number, Boolean],
  required: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: "text",
  },
});

const emit = defineEmits(["update:modelValue"]);
const formData = inject("formContext", null);

function setNestedValue(obj, path, value) {
  const keys = path.replace(/\]/g, "").split(/\[|\./);

  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = isNaN(keys[i + 1]) ? {} : [];
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

// Computed property for model binding
const model = computed({
  get() {
    
    return formData ? formData[props.name] : props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);

    if (formData && props.name) {
      if (props.name.includes("[") && props.name.includes("]")) {
        setNestedValue(formData, props.name, props.value ?? value);
      } else { 
        formData[props.name] = props.value !== false ? props.value : value;
      }
    }
  },
});
</script>

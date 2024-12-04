<script setup>
import Form from "@/components/ResourceForm/Form.vue";
import FormInput from "@/components/ResourceForm/FormInput.vue";
import FormSelect from "@/components/ResourceForm/FormSelect.vue";
import FormCheckBox from "@/components/ResourceForm/FormCheckBox.vue";
import FormRadio from "@/components/ResourceForm/FormRadio.vue";
import { ref, computed, inject, watch } from "vue";
const props = defineProps({
  id: String,
  name: String,
  placeholder: String,
  label: String,
  error: String,
  class: String,
  title: String,
  checked: Boolean,
  values: Object,
  redirectAfterSubmit: [String, Object],
  submitTitle: String,
  submit: [String, Function],
  options: [Object, Array, Function],
  modelValue: [String, Number, Array, Boolean],
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

const emit = defineEmits(["update:modelValue", "change"]);

const formData = inject("formContext", null);

const model = computed({
  get() {
    if (props.modelValue) {
      return props.modelValue;
    }
    return formData ? formData[props.name] : "";
  },
  set(value) {
    emit("update:modelValue", value);
    emit("change", value);

    if (formData && props.name) {
      formData[props.name] =  value;
    }
  },
});
</script>
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
    v-else-if="type == 'checkbox'"
    :id="props.id"
    :value="props.value"
    :name="props.name"
    v-model="model"
    :type="props.type"
    :checked="checked"
    :placeholder="props.placeholder"
    :label="props.label"
    :error="props.error"
    :class="props.class"
  />
  <FormRadio
    v-else-if="type == 'radio'"
    :id="props.id"
    :value="props.value"
    :name="props.name"
    v-model="model"
    :type="props.type"
    :checked="checked"
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

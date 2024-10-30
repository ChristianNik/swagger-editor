<script lang="ts">
export type ParameterFormData = {
  name: string;
  location: ParameterType | string;
  description: string;
};
</script>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  availableParameterTypes,
  type ParameterType,
} from "@/lib/available-parameters";

const props = defineProps<{
  data?: ParameterFormData | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", value: ParameterFormData): void;
}>();

const initialFormData = {
  name: "",
  location: "",
  description: "",
};

const formData = ref<ParameterFormData>({
  ...initialFormData,
  ...props.data,
});

watch(props, () => {
  if (!props.data) {
    formData.value = initialFormData;
    return;
  }

  formData.value = { ...props.data };
});

const onSubmit = () => {
  emit("submit", formData.value);

  formData.value = {
    name: "",
    location: "",
    description: "",
  };
};
</script>

<template>
  <form
    class="space-y-3"
    @submit.prevent="onSubmit"
  >
    <label>
      Name
      <input
        type="text"
        v-model="formData.name"
      />
    </label>

    <label>
      Location
      <select v-model="formData.location">
        <option
          v-for="method in availableParameterTypes"
          :value="method"
        >
          {{ method.toUpperCase() }}
        </option>
      </select>
    </label>

    <label>
      Description
      <textarea
        class="h-32"
        type="text"
        v-model="formData.description"
      />
    </label>

    <div class="flex justify-end">
      <button type="submit">Add Parameter</button>
    </div>
  </form>
</template>

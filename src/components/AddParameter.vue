<script lang="ts">
export type ResponseFormData = {
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
  data?: ResponseFormData | null;
}>();

defineEmits<{
  (e: "close"): void;
  (e: "submit", value: ResponseFormData): void;
}>();

const formData = ref<ResponseFormData>({
  name: "",
  location: "",
  description: "",
  ...props.data,
});

watch(props, () => {
  if (!props.data) {
    return;
  }

  formData.value = { ...props.data };
});
</script>

<template>
  <form
    class="space-y-3"
    @submit.prevent="$emit('submit', formData)"
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

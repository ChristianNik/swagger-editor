<script lang="ts">
export type ResponseFormData = {
  code: number;
  description: string;
};
</script>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  data?: ResponseFormData | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", value: ResponseFormData): void;
}>();

const initialFormData = {
  code: 0,
  description: "",
} satisfies ResponseFormData;

const formData = ref<ResponseFormData>({
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

  formData.value = initialFormData;
};
</script>

<template>
  <form
    class="space-y-3"
    @submit.prevent="onSubmit"
  >
    <label>
      Code
      <input
        type="number"
        v-model="formData.code"
      />
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

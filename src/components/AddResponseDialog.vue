<script setup lang="ts">
export type ResponseFormData = {
  code: string;
  description: string;
  contentType: string;
  schema: string;
};

import { ref, Teleport, watch } from "vue";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", value: ResponseFormData): void;
}>();

const dialog = ref<HTMLDialogElement>();

watch(props, () => {
  if (props.open) {
    dialog.value?.showModal();
  } else {
    dialog.value?.close();
  }
});

const formData = ref<ResponseFormData>({
  code: "",
  description: "",
  contentType: "",
  schema: "",
});

function handleSubmit() {
  emit("submit", formData.value);
  emit("close");
}
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="backdrop:bg-black/50 backdrop:backdrop-blur"
    >
      {{ formData }}
      <h2>Add response</h2>
      <form
        method="dialog"
        @submit.prevent="handleSubmit"
      >
        <label>
          Code
          <input
            type="text"
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

        <label>
          Content type
          <input
            type="text"
            v-model="formData.contentType"
          />
        </label>

        <label>
          Schema
          <textarea
            class="h-32"
            type="text"
            v-model="formData.schema"
          />
        </label>

        <button type="submit">Add</button>
        <button
          type="button"
          @click="$emit('close')"
        >
          Cancel
        </button>
      </form>
    </dialog>
  </Teleport>
</template>

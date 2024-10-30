<script lang="ts">
import type { RequestBodyContent } from "@/lib/response-body-manager";

export type RequestBodyFormData = {
  description: string;
  required: boolean;
  content: RequestBodyContent[];
};
</script>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  data?: RequestBodyFormData | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", value: RequestBodyFormData): void;
}>();

const initialFormData = {
  description: "",
  required: false,
  content: [],
} satisfies RequestBodyFormData;

const formData = ref<RequestBodyFormData>({
  ...initialFormData,
  ...props.data,
});

const contentFormData = ref({
  type: "",
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

function addContent(type: string) {
  formData.value.content.push({
    type,
  });
}

function handleAddContentClick() {
  addContent(contentFormData.value.type);
  contentFormData.value.type = "";
}

function handleContentRemoveClick(type: string) {
  formData.value.content = formData.value.content.filter(
    (c) => c.type !== type
  );
}
</script>

<template>
  <form
    class="space-y-3"
    @submit.prevent="onSubmit"
  >
    <label>
      Description
      <textarea
        class="h-32"
        type="text"
        v-model="formData.description"
      />
    </label>

    <div class="flex items-center">
      <input
        id="request-body-required"
        class="w-4 h-4"
        type="checkbox"
        v-model="formData.required"
      />
      <label
        class="ms-2"
        for="request-body-required"
      >
        Required
      </label>
    </div>

    <h2>Content</h2>

    <input
      type="text"
      v-model="contentFormData.type"
    />

    <button
      type="button"
      @click="handleAddContentClick"
    >
      Add Content
    </button>

    <ul>
      <li
        class="flex justify-between"
        v-for="content in formData.content"
      >
        {{ content.type }}
        <button
          type="button"
          @click="handleContentRemoveClick(content.type)"
        >
          x
        </button>
      </li>
    </ul>

    <div class="flex justify-end">
      <button type="submit">Add Request body</button>
    </div>
  </form>
</template>

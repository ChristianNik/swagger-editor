<script lang="ts">
import type { RequestBodyContent } from "@/lib/response-body-manager";

export type RequestBodyFormData = {
  description: string;
  required: boolean;
  content: RequestBodyContent[];
};
</script>

<script setup lang="ts">
const props = defineProps<{
  description: string;
  required: boolean;
}>();
</script>

<template>
  <div>{{ description }} - {{ required ? "Required" : "" }}</div>
</template>

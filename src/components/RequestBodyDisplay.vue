<script lang="ts">
import type { RequestBodyContent } from "@/lib/response-body-manager";
</script>

<script setup lang="ts">
const props = defineProps<{
  description: string;
  required: boolean;
  contents: RequestBodyContent[];
}>();
</script>

<template>
  <div>{{ description }} - {{ required ? "Required" : "" }}</div>

  <select>
    <option
      v-for="content in contents"
      :value="content"
    >
      {{ content.type }}
    </option>
  </select>
</template>

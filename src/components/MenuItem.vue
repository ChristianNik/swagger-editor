<script setup lang="ts">
import type { HttpMethod } from "@/types/http-method";
import MethodDisplay from "./MethodDisplay.vue";
defineProps<{
  method: HttpMethod;
  path: string;
}>();
</script>

<template>
  <li
    class="px-3 py-2 grid gap-3 hover:bg-gray-50 cursor-pointer whitespace-nowrap overflow-ellipsis"
    style="grid-template-columns: 60px 1fr"
    :title="`${method} ${path}`"
  >
    <MethodDisplay :method="method" />
    {{ path }}
  </li>
</template>

<style scoped></style>

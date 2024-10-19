<script setup lang="ts">
import type { HttpMethod } from "@/types/http-method";
import MethodDisplay from './MethodDisplay.vue'
defineProps<{
  method: HttpMethod;
  path: string;
}>();
</script>

<template>
  <li
    class="px-3 py-1 grid hover:bg-gray-50"
    style="grid-template-columns: 1fr 4fr"
  >
    <MethodDisplay :method="method" />
    {{ path }}
  </li>
</template>

<style scoped></style>

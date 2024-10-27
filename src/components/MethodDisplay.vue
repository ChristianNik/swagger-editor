<script setup lang="ts">
import {
  getMethodTailwindClass,
  type MethodType,
} from "@/lib/available-methods";

defineProps<{
  method: MethodType | string;
}>();
</script>

<template>
  <b :class="getMethodTailwindClass(method as MethodType )">
    {{ method.toUpperCase() }}
  </b>
</template>

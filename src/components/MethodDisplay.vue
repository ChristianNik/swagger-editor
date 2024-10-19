<script setup lang="ts">
import type { HttpMethod } from '@/types/http-method';

defineProps<{
  method: HttpMethod;
}>();
</script>

<template>
  <b
    :class="{
      'text-green-500': method.toLowerCase() === 'post',
      'text-yellow-500': method.toLowerCase() === 'put',
      'text-blue-500': method.toLowerCase() === 'get',
      'text-red-500': method.toLowerCase() === 'delete',
    }"
  >
    {{ method.toUpperCase() }}
  </b>
</template>

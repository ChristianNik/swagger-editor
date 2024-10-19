<script setup lang="ts">
defineProps<{
  method: "get" | "post" | "put" | "delete";
  path: string;
}>();
</script>

<template>
  <li class="px-3 py-1 grid hover:bg-gray-50" style="grid-template-columns: 1fr 4fr;">
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
    {{ path }}
  </li>
</template>

<style scoped></style>

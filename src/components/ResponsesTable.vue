<script setup lang="ts">
import type { Response } from '@/lib/response-manager';

defineProps<{
  data: Response[];
}>();

defineEmits<{
  (e: "edit", name: number): void;
  (e: "delete", name: number): void;
}>();
</script>

<template>
  <table class="w-full text-sm text-left rtl:text-right text-gray-500">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th
          scope="col"
          class="px-6 py-3"
        >
          Code
        </th>
        <th
          scope="col"
          class="px-6 py-3"
        >
          Description
        </th>
        <th>
          <!-- Actions -->
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="bg-white border-b"
        v-for="parameter in data"
      >
        <td class="px-6 py-4">
          {{ parameter.code }}
        </td>
        <td class="px-6 py-4">
          {{ parameter.description }}
        </td>
        <td>
          <button @click="$emit('edit', parameter.code)">Edit</button>
          <button @click="$emit('delete', parameter.code)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

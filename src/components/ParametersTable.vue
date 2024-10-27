<script setup lang="ts">
import type { Parameter } from '@/lib/parameter-manager';

defineProps<{
  data: Parameter[];
}>();

defineEmits<{
  (e: "edit", name: string): void;
  (e: "delete", name: string): void;
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
          Name
        </th>
        <th
          scope="col"
          class="px-6 py-3"
        >
          Location
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
          {{ parameter.name }}
        </td>
        <td class="px-6 py-4">
          {{ parameter.in }}
        </td>
        <td class="px-6 py-4">
          {{ parameter.description }}
        </td>
        <td>
          <button @click="$emit('edit', parameter.name)">Edit</button>
          <button @click="$emit('delete', parameter.name)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

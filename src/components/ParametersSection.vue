<script setup lang="ts">
import type { SwaggerParameters } from "@/types/swagger";

defineProps<{
  parameters: SwaggerParameters[];
}>();
</script>

<template>
  <div class="p-6 space-y-3 border-t">
    <h3 class="flex justify-between items-center">
      <b>Parameters</b>
    </h3>

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
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b"
          v-for="parameter in parameters"
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

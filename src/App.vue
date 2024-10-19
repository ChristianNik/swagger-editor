<script setup lang="ts">
import SwaggerDocument from "./lib/SwaggerDocument";
import MenuItem from "./components/MenuItem.vue";
import MethodDisplay from "./components/MethodDisplay.vue";

const swaggerDocument = new SwaggerDocument();

const selectedItem = swaggerDocument.getMethodForPath("/pet", "put");
</script>

<template>
  <div class="grid grid-cols-3 h-screen">
    <nav class="">
      <details v-for="tag in swaggerDocument.getTags()">
        <summary class="p-3 font-bold text-xl">
          {{ tag.name.toUpperCase() }}
        </summary>

        <ul class="">
          <div v-for="item in swaggerDocument.getPathsForTag(tag.name)">
            <MenuItem
              v-for="method in item.methods"
              :method="method.method"
              :path="item.path"
            />
          </div>
        </ul>
      </details>
    </nav>
    <main class="col-span-2 border-l">
      <h1 class="p-3 border-b flex gap-3">
        <MethodDisplay :method="selectedItem.method" /> {{ selectedItem.path }}
      </h1>

      <div class="p-3 space-y-3">
        <label>
          Summary
          <input
            type="text"
            :value="selectedItem.summary"
          />
        </label>

        <label>
          Description
          <textarea
            class="h-32"
            type="text"
            :value="selectedItem.description"
          />
        </label>
      </div>
      <div class="p-3 space-y-3 border-t">
        <label>
          Summary
          <input
            type="text"
            :value="selectedItem.summary"
          />
        </label>

        <!-- <h3 class="flex justify-between items-center">
          <b>RequestBody</b>

          <select>
            <option value="">dwa</option>
          </select>
        </h3> -->

        <h3 class="flex justify-between items-center">
          <b>Responses</b>
        </h3>
        <div class="relative overflow-x-auto">
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
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b"
                v-for="response in Object.entries(selectedItem.responses).map(([code, value]) => {
            (value as any).code = code;
            return value;
          })"
              >
                <td class="px-6 py-4">{{ (response as any).code }}</td>
                <td class="px-6 py-4">
                  {{ (response as any).description }}

                  <div>
                    {{ (response as any).content }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <pre>
        {{ selectedItem }}
      </pre>
    </main>
  </div>
</template>

<style scoped></style>

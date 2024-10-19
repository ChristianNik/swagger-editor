<script setup lang="ts">
import SwaggerDocument from "./lib/SwaggerDocument";
import MenuItem from "./components/MenuItem.vue";
import MethodDisplay from "./components/MethodDisplay.vue";

const swaggerDocument = new SwaggerDocument();

const selectedItem = swaggerDocument.getMethodForPath("/pet", "put");
</script>

<template>
  <div class="grid h-screen overflow-auto" style="grid-template-columns: auto 1fr;">
    <nav class="overflow-auto">
      <div v-for="tag in swaggerDocument.getTags()">
        <h2 class="p-3 font-bold text-xl">
          {{ tag.name.toUpperCase() }}
        </h2>

        <ul class="">
          <div v-for="item in swaggerDocument.getPathsForTag(tag.name)">
            <MenuItem
              v-for="method in item.methods"
              :method="method.method"
              :path="item.path"
            />
          </div>
        </ul>
      </div>
    </nav>
    <main class="border-l overflow-auto">
      <h1 class="p-3 border-b flex gap-3 sticky top-0 bg-white z-10">
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
        <div class="relative overflow-x-auto z-0">
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
                <td class="px-6 py-4" :class="{
                  'text-green-500 font-bold': (response as any).code >= 200 && (response as any).code < 300,
                  'text-orange-500': (response as any).code >= 300 && (response as any).code < 400,
                  'text-red-500': (response as any).code >= 400 && (response as any).code < 500,
                  'text-red-900': (response as any).code >= 500 && (response as any).code < 600,
                }">{{ (response as any).code }}</td>
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

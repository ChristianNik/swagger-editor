<script setup lang="ts">
import SwaggerDocument from "../lib/SwaggerDocument";
import MenuItem from "../components/MenuItem.vue";
import MethodDisplay from "../components/MethodDisplay.vue";
import { computed, ref, watch } from "vue";
import type { HttpMethod } from "../types/http-method";
import { store } from "@/lib/store";
import yaml from "js-yaml";

const selectedPath = ref("");
const selectedMethod = ref<HttpMethod>("get");

const swaggerDocument = computed(
  () => new SwaggerDocument(store.importedSwaggerDocument)
);

const selectedItem = computed(() =>
  swaggerDocument.value.getMethodForPath(
    selectedPath.value,
    selectedMethod.value
  )
);

const formData = ref({
  summary: "",
});

watch(selectedItem, () => {
  formData.value.summary = selectedItem.value?.summary || "";
});

function handleSaveClick() {
  const copy = { ...swaggerDocument.value.document };
  copy.paths[selectedPath.value][selectedMethod.value].summary =
    formData.value.summary;

  console.log(JSON.stringify(copy.paths));
  console.log(yaml.dump(copy));
}
</script>

<template>
  <div
    class="grid overflow-auto"
    style="grid-template-columns: auto 1fr; height: calc(100vh - 48px)"
  >
    <nav class="overflow-hidden max-w-sm">
      <div v-for="tag in swaggerDocument.getTags()">
        <h2 class="p-3 font-bold text-xl">
          {{ tag.name ? tag.name.toUpperCase() : "Missing Tags" }}
        </h2>

        <ul class="">
          <div
            v-for="path in swaggerDocument.paths.filter((p) => {
              return (!p.tags && !tag.name) || p.tags.includes(tag.name);
            })"
          >
            <MenuItem
              :method="path.method"
              :path="path.path"
              @click="
                () => {
                  selectedPath = path.path;
                  selectedMethod = path.method;
                }
              "
            />
          </div>
        </ul>
      </div>
    </nav>
    <main class="border-l overflow-auto">
      <div v-if="selectedItem">
        <h1 class="p-3 border-b flex gap-3 sticky top-0 bg-white z-10">
          <MethodDisplay :method="selectedItem.method" />
          {{ selectedItem.path }}
        </h1>

        <div class="p-3 space-y-3">
          <label>
            Summary
            <input
              type="text"
              v-model="formData.summary"
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
          <h3 class="flex justify-between items-center">
            <b>RequestBody</b>

            <select>
              <option
                v-for="option in selectedItem.requestBody?.content"
                :value="option.contentType"
              >
                {{ option.contentType }}
              </option>
            </select>
          </h3>

          <label>
            Description
            <input
              type="text"
              :value="selectedItem.requestBody?.description"
            />
          </label>

          <code>
            {{
              selectedItem.requestBody?.content.find(
                (content) => content.contentType === "application/json"
              )?.schema
            }}
          </code>

          <h3 class="flex justify-between items-center">
            <b>Responses</b>
          </h3>
          <div class="relative overflow-x-auto z-0">
            <table
              class="w-full text-sm text-left rtl:text-right text-gray-500"
            >
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
                  v-for="response in selectedItem.responses"
                >
                  <td
                    class="px-6 py-4"
                    :class="{
                      'text-green-500 font-bold':
                        Number(response.code) >= 200 &&
                        Number(response.code) < 300,
                      'text-orange-500':
                        Number(response.code) >= 300 &&
                        Number(response.code) < 400,
                      'text-red-500':
                        Number(response.code) >= 400 &&
                        Number(response.code) < 500,
                      'text-red-900':
                        Number(response.code) >= 500 &&
                        Number(response.code) < 600,
                    }"
                  >
                    {{ response.code }}
                  </td>
                  <td class="px-6 py-4">
                    {{ response.description }}

                    <div v-if="response.content">
                      <select
                        v-if="
                          response.content.length > 0 &&
                          !!response.content[0].contentType
                        "
                      >
                        <option
                          v-for="option in response.content"
                          :value="option.contentType"
                        >
                          {{ option.contentType }}
                        </option>
                      </select>

                      <code class="mt-3">
                        {{
                          response.content.find(
                            (content) =>
                              !content.contentType ||
                              content.contentType === "application/json"
                          )?.schema
                        }}
                      </code>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="p-3 space-y-3 border-t sticky bottom-0 bg-white z-10 flex justify-end"
        >
          <button
            class="bg-blue-500 text-white hover:bg-blue-400 border-inherit min-w-20"
            @click="handleSaveClick()"
          >
            Save
          </button>
        </div>
      </div>
      <div v-else>No path selected!</div>
    </main>
  </div>
</template>

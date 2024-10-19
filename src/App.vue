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
          <input
            type="text"
            :value="selectedItem.description"
          />
        </label>
      </div>
      <pre>
        {{ selectedItem }}
      </pre>
    </main>
  </div>
</template>

<style scoped></style>

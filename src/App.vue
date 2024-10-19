<script setup lang="ts">
import SwaggerDocument from "./lib/SwaggerDocument";
import MenuItem from "./components/MenuItem.vue";

const swaggerDocument = new SwaggerDocument()
</script>

<template>
  <div class="grid grid-cols-3">
    <nav class="">
      <details v-for="tag in swaggerDocument.getTags()">
        <summary class="p-3 font-bold text-xl">
          {{ tag.name.toUpperCase() }}
        </summary>

        <ul class="">
          <div
            v-for="item in swaggerDocument.getPathsForTag(tag.name)"
          >
            <MenuItem
              v-for="method in item.methods"
              :method="method.method"
              :path="item.path"
            />
          </div>
        </ul>
      </details>
    </nav>
    <main class="col-span-2"></main>
  </div>
</template>

<style scoped></style>

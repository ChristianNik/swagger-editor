<script setup lang="ts">
import SwaggerDocument from "../lib/SwaggerDocument";
import MenuItem from "../components/MenuItem.vue";
import { computed } from "vue";
import { store } from "@/lib/store";

const swaggerDocument = computed(
  () => new SwaggerDocument(store.importedSwaggerDocument)
);
</script>

<template>
  <div
    class="grid overflow-auto"
    style="grid-template-columns: auto 1fr; height: calc(100vh - 48px)"
  >
    <nav class="overflow-auto max-w-sm">
      <div v-for="tag in swaggerDocument.getTags()">
        <h2 class="p-3 font-bold text-xl">
          {{ tag.name ? tag.name.toUpperCase() : "Missing Tags" }}
        </h2>

        <ul>
          <div
            v-for="path in swaggerDocument.paths.filter((p) => {
              return (!p.tags && !tag.name) || p.tags?.includes(tag.name);
            })"
          >
            <MenuItem
              :method="path.method"
              :path="path.path"
              @click="
                () => {
                  store.selectedPath = path.path;
                  store.selectedMethod = path.method;
                }
              "
            />
          </div>
        </ul>
      </div>
    </nav>
    <main class="border-l overflow-auto">
      <div class="border-b">
        <RouterLink
          class="p-3"
          to="/"
        >
          Editor
        </RouterLink>
        <RouterLink
          class="p-3"
          to="/code"
        >
          Code
        </RouterLink>
        <RouterLink
          class="p-3"
          to="/swagger"
        >
          Swagger
        </RouterLink>
      </div>

      <RouterView />
    </main>
  </div>
</template>

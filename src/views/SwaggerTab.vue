<script setup lang="ts">
import SwaggerDocument from "../lib/SwaggerDocument";
import { computed, onMounted } from "vue";
import { store } from "@/lib/store";
import SwaggerUI from "swagger-ui";

const swaggerDocument = computed(
  () => new SwaggerDocument(store.importedSwaggerDocument)
);

const copy = { ...swaggerDocument.value.document };

onMounted(() => {
  SwaggerUI({
    dom_id: "#swagger-ui",
    spec: copy,
    layout: "BaseLayout",
  });
});
</script>

<template>
  <div id="swagger-ui"></div>
</template>

<script setup lang="ts">
import SwaggerDocument from "../lib/SwaggerDocument";
import MethodDisplay from "../components/MethodDisplay.vue";
import { computed, ref, watch } from "vue";
import { store } from "@/lib/store";
import yaml from "js-yaml";

const swaggerDocument = computed(
  () => new SwaggerDocument(store.importedSwaggerDocument)
);

const selectedItem = computed(() => {
  if (store.selectedPath && store.selectedMethod) {
    return swaggerDocument.value.getMethodForPath(
      store.selectedPath,
      store.selectedMethod
    );
  }

  return undefined;
});

const availableCodeTypes = <const>["json", "yaml"];
const codeType = ref<(typeof availableCodeTypes)[number]>("yaml");

const code = computed(() => {
  const copy = { ...swaggerDocument.value.document };

  if (codeType.value === "json") {
    return JSON.stringify(copy, null, 2);
  } else if (codeType.value === "yaml") {
    return yaml.dump(copy);
  }
});
</script>

<template>
  <div class="grid p-4">
    <label>
      <select v-model="codeType">
        <option
          v-for="option in availableCodeTypes"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </label>
    <textarea
      class="h-screen"
      readonly
      >{{ code }}</textarea
    >
  </div>
</template>

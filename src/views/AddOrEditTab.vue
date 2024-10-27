<script setup lang="ts">
import MethodDisplay from "../components/MethodDisplay.vue";
import { ref } from "vue";
import ParametersTable, {
  type Parameter,
} from "@/components/ParametersTable.vue";

interface PathFormData {
  path: string;
  method: string;
  description?: string;
  parameters: Parameter[];
}

const formData = ref<PathFormData>({
  path: "",
  method: "",
  description: "",
  parameters: [{ name: "test", in: "query", description: "" }],
});

function addParameter(
  name: string,
  type: "path" | "query",
  description?: string
) {
  const foundIndex = formData.value.parameters.findIndex(
    (p) => p.name === name
  );
  if (foundIndex != -1) {
    // Maybe throw an Exception
    return;
  }

  formData.value.parameters.push({
    name,
    in: type,
    description,
  });
}

const availableMethods = <const>["get", "post", "put", "delete"];

function handleAddParameterClick() {
  addParameter("status", "query");
}
</script>

<template>
  <h1 class="px-6 py-3 border-b flex gap-3 sticky top-0 bg-white z-10">
    <MethodDisplay :method="formData.method" />
    {{ formData.path }}
  </h1>

  <div class="px-6 py-3 space-y-3">
    <label>
      Path
      <input
        type="text"
        v-model="formData.path"
      />
    </label>

    <label>
      Method
      <select v-model="formData.method">
        <option
          v-for="method in availableMethods"
          :value="method"
        >
          {{ method.toUpperCase() }}
        </option>
      </select>
    </label>

    <label>
      Description
      <textarea
        class="h-48"
        type="text"
        v-model="formData.description"
      />
    </label>
  </div>

  <h2
    class="px-6 py-3 border-y flex gap-3 justify-between items-center sticky top-0 bg-white z-10"
  >
    Parameters
    <button
      data-type="primary"
      @click="handleAddParameterClick"
    >
      Add
    </button>
  </h2>

  <div class="px-6 py-3 space-y-3">
    <ParametersTable :data="formData.parameters"/>
  </div>
</template>

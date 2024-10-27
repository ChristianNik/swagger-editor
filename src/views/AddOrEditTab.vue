<script setup lang="ts">
import MethodDisplay from "../components/MethodDisplay.vue";
import { ref } from "vue";
import ParametersTable from "@/components/ParametersTable.vue";
import { ParameterManager } from "@/lib/parameter-manager";

interface PathFormData {
  path: string;
  method: string;
  description?: string;
  parameters: ParameterManager;
}

const formData = ref<PathFormData>({
  path: "",
  method: "",
  description: "",
  parameters: new ParameterManager(),
});

const availableMethods = <const>["get", "post", "put", "delete"];

function handleAddParameterClick() {
  formData.value.parameters.add("status", "query");
}

function handleEditParameter(name: string) {
  formData.value.parameters.update(name, {
    name: "bob",
  });
}

function handleDeleteParameter(name: string) {
  formData.value.parameters.removeByName(name);
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
    <ParametersTable
      :data="formData.parameters.parameters"
      @edit="handleEditParameter"
      @delete="handleDeleteParameter"
    />
  </div>

  <div class="h-screen"></div>
</template>

<script setup lang="ts">
import MethodDisplay from "../components/MethodDisplay.vue";
import { onMounted, ref } from "vue";
import ParametersTable from "@/components/ParametersTable.vue";
import AddParameter from "@/components/ParameterForm.vue";
import Dialog from "@/components/Dialog.vue";
import { ParameterManager } from "@/lib/parameter-manager";
import type { ResponseFormData } from "@/components/ParameterForm.vue";
import type { ParameterType } from "@/lib/available-parameters";
import { getMethodTailwindClass } from "@/lib/available-methods";

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

const isParameterEditMode = ref(false);
const ParameterDialog = ref<InstanceType<typeof Dialog>>();

function handleAddParameterClick() {
  isParameterEditMode.value = false;
  ParameterDialog.value?.show();
}

function handleAddParameter(data: ResponseFormData) {
  formData.value.parameters.add(
    data.name,
    data.location as ParameterType,
    data.description
  );

  ParameterDialog.value?.close();
}

const parameterData = ref<ResponseFormData | null>();
function handleEditParameterClick(name: string) {
  const data = formData.value.parameters.findByName(name);

  if (!data) {
    return;
  }

  parameterData.value = {
    name: data.name,
    location: data.in,
    description: data.description || "",
  };

  isParameterEditMode.value = true;
  ParameterDialog.value?.show();
}

function handleEditParameter(name: string, data: ResponseFormData) {
  formData.value.parameters.update(name, data);
  ParameterDialog.value?.close();
}

function handleDeleteParameter(name: string) {
  formData.value.parameters.removeByName(name);
}
</script>

<template>
  <h1 class="px-6 py-3 border-b flex gap-3 sticky top-0 bg-white z-10">
    <MethodDisplay :method="formData.method" />
    <b>{{ formData.path }}</b>
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
          :class="getMethodTailwindClass(method)"
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
    <b>Parameters</b>
    <button
      data-type="primary"
      @click="handleAddParameterClick"
    >
      Add
    </button>
  </h2>
  <Dialog ref="ParameterDialog">
    <div class="rounded w-96">
      <h2
        class="px-6 py-3 border-y flex gap-3 justify-between items-center rounded-t font-bold"
      >
        Parameters

        <button @click="ParameterDialog?.close()">X</button>
      </h2>

      <div class="px-6 py-3 rounded-b">
        <AddParameter
          @submit="
            isParameterEditMode ? handleEditParameter($event.name, $event) : handleAddParameter($event)
          "
          :data="parameterData"
        />
      </div>
    </div>
  </Dialog>
  <div class="px-6 py-3 space-y-3">
    <ParametersTable
      :data="formData.parameters.parameters"
      @edit="handleEditParameterClick"
      @delete="handleDeleteParameter"
    />
  </div>

  <div class="h-screen"></div>
</template>

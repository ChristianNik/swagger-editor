<script setup lang="ts">
import MethodDisplay from "../components/MethodDisplay.vue";
import { ref } from "vue";
import ParametersTable from "@/components/ParametersTable.vue";
import ResponsesTable from "@/components/ResponsesTable.vue";
import ParameterForm from "@/components/ParameterForm.vue";
import ResponseForm, {
  type ResponseFormData,
} from "@/components/ResponseForm.vue";
import Dialog from "@/components/Dialog.vue";
import { ParameterManager } from "@/lib/parameter-manager";
import type { ParameterFormData } from "@/components/ParameterForm.vue";
import type { ParameterType } from "@/lib/available-parameters";
import { getMethodTailwindClass } from "@/lib/available-methods";
import yaml from "js-yaml";
import { ResponseManager } from "@/lib/response-manager";

interface PathFormData {
  path: string;
  method: string;
  description?: string;
  parameters: ParameterManager;
  responses: ResponseManager;
}

const formData = ref<PathFormData>({
  path: "/",
  method: "",
  description: "",
  parameters: new ParameterManager(),
  responses: new ResponseManager(),
});

function handleCodeClick() {
  // convert responses array to object with code as the key
  const responses = formData.value.responses.responses.reduce<{[code: number]: any}>((acc, response) => {
    acc[response.code] = {
      description: response.description
    }

    return acc
  }, {})

  const swagger = {
    [formData.value.path]: {
      [formData.value.method]: {
        parameters: formData.value.parameters.parameters,
        description: formData.value.description,
        responses,
      },
    },
  };

  const parsed = yaml.dump(swagger);
  console.log(parsed);
}

const availableMethods = <const>["get", "post", "put", "delete"];

const isParameterEditMode = ref(false);
const ParameterDialog = ref<InstanceType<typeof Dialog>>();

function handleAddParameterClick() {
  isParameterEditMode.value = false;
  ParameterDialog.value?.show();
}

function handleAddParameter(data: ParameterFormData) {
  formData.value.parameters.add(
    data.name,
    data.location as ParameterType,
    data.description
  );

  closeEditParameterDialog();
}

const parameterData = ref<ParameterFormData | null>();
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

function handleEditParameter(name: string, data: ParameterFormData) {
  formData.value.parameters.update(name, {
    name: data.name,
    in: data.location as ParameterType,
    description: data.description,
  });

  closeEditParameterDialog();
}

function closeEditParameterDialog() {
  parameterData.value = null;
  ParameterDialog.value?.close();
}

function handleDeleteParameter(name: string) {
  formData.value.parameters.removeByName(name);
}

const isResponseEditMode = ref(false);
const ResponseDialog = ref<InstanceType<typeof Dialog>>();

function handleAddResponseClick() {
  isResponseEditMode.value = false;
  ResponseDialog.value?.show();
}

function handleAddResponse(data: ResponseFormData) {
  formData.value.responses.add(data.code, data.description);

  closeEditResponseDialog();
}

const responseData = ref<ResponseFormData | null>();
function handleEditResponseClick(code: number) {
  const data = formData.value.responses.findByCode(code);

  if (!data) {
    return;
  }

  responseData.value = {
    code: data.code,
    description: data.description,
  };

  isResponseEditMode.value = true;
  ResponseDialog.value?.show();
}

function handleEditResponse(code: number, data: ResponseFormData) {
  formData.value.responses.update(code, {
    code: data.code,
    description: data.description,
  });

  closeEditResponseDialog();
}

function handleDeleteResponse(code: number) {
  formData.value.responses.removeByCode(code);
}

function closeEditResponseDialog() {
  responseData.value = null;
  ResponseDialog.value?.close();
}
</script>

<template>
  <div
    class="px-6 py-3 border-b flex justify-between items-center gap-3 sticky top-0 bg-white z-10"
  >
    <h1>
      <MethodDisplay
        class="mr-3"
        :method="formData.method"
      />
      <b>{{ formData.path }}</b>
    </h1>
    <button @click="handleCodeClick">Code</button>
  </div>

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

        <button @click="closeEditParameterDialog">X</button>
      </h2>

      <div class="px-6 py-3 rounded-b">
        <ParameterForm
          @submit="
            isParameterEditMode
              ? handleEditParameter($event.name, $event)
              : handleAddParameter($event)
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

  <h2
    class="px-6 py-3 border-y flex gap-3 justify-between items-center sticky top-0 bg-white z-10"
  >
    <b>Responses</b>
    <button
      data-type="primary"
      @click="handleAddResponseClick"
    >
      Add
    </button>
  </h2>

  <Dialog ref="ResponseDialog">
    <div class="rounded w-96">
      <h2
        class="px-6 py-3 border-y flex gap-3 justify-between items-center rounded-t font-bold"
      >
        Responses

        <button @click="closeEditResponseDialog">X</button>
      </h2>

      <div class="px-6 py-3 rounded-b">
        <ResponseForm
          @submit="
            isResponseEditMode
              ? handleEditResponse($event.code, $event)
              : handleAddResponse($event)
          "
          :data="responseData"
        />
      </div>
    </div>
  </Dialog>
  <div class="px-6 py-3 space-y-3">
    <ResponsesTable
      :data="formData.responses.responses"
      @edit="handleEditResponseClick"
      @delete="handleDeleteResponse"
    />
  </div>

  <div class="h-screen"></div>
</template>

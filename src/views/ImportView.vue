<script setup lang="ts">
import { store } from "@/lib/store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const swaggerCode = ref(JSON.stringify(store.importedSwaggerDocument, null, 2));

function handleSubmitClick() {
  try {
    store.importedSwaggerDocument = JSON.parse(swaggerCode.value);
    alert("Imported!");

    router.push("/");
  } catch (error) {
    alert("Could not parse.");
  }
}
</script>

<template>
  <div
    class="h-screen overflow-auto"
    style="grid-template-columns: auto 1fr"
  >
    <main class="border-l overflow-auto">
      <div class="p-3 space-y-3 max-w-3xl mx-auto">
        <h1 class="font-bold">ImportView</h1>
        <form @submit.prevent="handleSubmitClick()">
          <label>
            Swagger code:
            <textarea
              class="h-80"
              type="text"
              v-model="swaggerCode"
            />
          </label>

          <div class="p-3 space-y-3 flex justify-end">
            <button
              class="bg-blue-500 text-white hover:bg-blue-400 border-inherit min-w-20"
              type="submit"
            >
              Import
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<style></style>

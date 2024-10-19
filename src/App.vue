<script setup lang="ts">
import exampleSwagger from "./assets/example-swagger.json";
import MenuItem from "./components/MenuItem.vue";

const addObjectKeyToObject = (array: object) =>
  Object.entries(array).map(([method, data]) => ({
    method,
    ...data,
  }));

const getData = () => {
  return Object.entries(exampleSwagger.paths).map(
    ([path, availableMethods]) => {
      return {
        path,
        methods: addObjectKeyToObject(availableMethods),
      };
    }
  );
};

const data = getData();
</script>

<template>
  <div class="grid grid-cols-3">
    <nav class="">
      <detail v-for="tag in exampleSwagger.tags">
        <summary class="p-3 font-bold text-xl">
          {{ tag.name.toUpperCase() }}
        </summary>
        <ul class="">
          <div
            v-for="item in data.map((d) => ({
              ...d,
              methods: d.methods.filter((m) => m.tags.includes(tag.name)),
            }))"
          >
            <MenuItem
              v-for="method in item.methods"
              :method="method.method"
              :path="item.path"
            />
          </div>
        </ul>
      </detail>
    </nav>
    <main class="col-span-2"></main>
  </div>
</template>

<style scoped></style>

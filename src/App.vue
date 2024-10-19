<script setup lang="ts">
import exampleSwagger from "./assets/example-swagger.json";
import MenuItem from "./components/MenuItem.vue";
</script>

<template>
  <div class="grid grid-cols-3">
    <nav class="">
      <h2 class="p-3 font-bold text-xl">PET</h2>

      <ul class="">
        <MenuItem
          method="post"
          path="/pet"
        />
        <MenuItem
          method="put"
          path="/pet"
        />
        <MenuItem
          method="get"
          path="/pet/findByStatus"
        />
      </ul>
    </nav>
    <main class="col-span-2">dwa</main>
  </div>
</template>

<style scoped></style>

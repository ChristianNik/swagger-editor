<script setup lang="ts"></script>

<template>
  <header class="flex items-center h-12 border-b">
    <nav>
      <RouterLink class="p-3" to="/">View</RouterLink>
      <RouterLink class="p-3" to="/import">Import</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>

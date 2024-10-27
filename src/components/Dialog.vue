<script setup lang="ts">
import { ref } from "vue";

const dialog = ref<HTMLDialogElement | null>(null);

const showDialog = () => dialog.value?.showModal();
const closeDialog = () => dialog.value?.close("close_reason_user_control");

defineExpose({
  show: showDialog,
  close: closeDialog,
});
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog">
      <slot />
    </dialog>
  </Teleport>
</template>

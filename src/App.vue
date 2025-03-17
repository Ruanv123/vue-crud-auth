<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "vue-sonner";
</script>

<template>
  <Toaster rich-colors position="bottom-left" close-button />
  <RouterView />
</template>

<style scoped></style>

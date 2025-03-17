<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "vue-sonner";
</script>

<template>
  <Toaster rich-colors />
  <RouterView />
</template>

<style scoped></style>

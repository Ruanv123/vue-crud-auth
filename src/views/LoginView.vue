<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import { GalleryVerticalEnd } from "lucide-vue-next";
import { RouterLink } from "vue-router";
</script>

<template>
  <div
    class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
  >
    <div class="flex w-full max-w-sm flex-col gap-6">
      <RouterLink
        to="/"
        class="flex items-center gap-2 self-center font-medium"
      >
        <div
          class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"
        >
          <GalleryVerticalEnd class="size-4" />
        </div>
        Acme Inc.
      </RouterLink>
      <LoginForm />
    </div>
  </div>
</template>

<style scoped></style>

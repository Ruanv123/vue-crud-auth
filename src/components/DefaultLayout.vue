<script setup lang="ts">
import AppSidebar from "./AppSidebar.vue";
import { Separator } from "./ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
</script>

<template>
  <div class="h-screen">
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] border-b border ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 h-4" />
            <!-- <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> -->
          </div>
        </header>
        <main class="p-5 overflow-y-scroll">
          <RouterView />
        </main>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<script setup lang="ts">
import { api } from "@/lib/api";
import { useQueryClient } from "@tanstack/vue-query";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Textarea } from "./ui/textarea";

const queryClient = useQueryClient();

const name = ref("");
const description = ref("");
const price = ref("");
const quantity = ref(0);

const onSubmit = async (e: Event) => {
  e.preventDefault();

  console.log("entrou");

  if (!name.value || !description.value || !price.value || !quantity.value) {
    toast.error("Todos os campos são obrigatórios!");
    return;
  }

  try {
    const res = await api.post("/products", {
      name: name.value,
      description: description.value,
      price: parseFloat(price.value),
      quantity: quantity.value,
    });

    console.log(res);
    toast.success("Produto criado com sucesso!");
    queryClient.invalidateQueries({ queryKey: ["products"] });
  } catch (error) {
    toast.error("Erro ao criar o produto.");
    console.error(error);
  }
};
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button size="sm">Add Product +</Button>
    </SheetTrigger>
    <SheetContent>
      <form @submit="onSubmit">
        <SheetHeader>
          <SheetTitle>Create new Product</SheetTitle>
          <SheetDescription>create your new product...</SheetDescription>
        </SheetHeader>

        <div class="grid gap-4 py-4">
          <div class="">
            <Label for="name">Name</Label>
            <Input
              v-model="name"
              id="name"
              type="text"
              placeholder="Enter product name"
            />
          </div>
          <div class="">
            <Label for="description">Description</Label>
            <Textarea
              v-model="description"
              id="description"
              cols="10"
              rows="5"
              placeholder="Enter product description"
            />
          </div>
          <div class="">
            <Label for="price">Price</Label>
            <Input
              v-model="price"
              id="price"
              type="text"
              placeholder="Enter product price"
            />
          </div>
          <div class="">
            <Label for="quantity">Quantity</Label>
            <Input
              v-model="quantity"
              id="quantity"
              type="number"
              placeholder="Enter product quantity"
            />
          </div>
        </div>

        <SheetFooter>
          <!-- <SheetClose as-child> -->
          <Button type="submit">Create Product</Button>
          <!-- </SheetClose> -->
        </SheetFooter>
      </form>
    </SheetContent>
  </Sheet>
</template>

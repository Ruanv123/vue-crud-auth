<script setup lang="ts">
import CreateProductModal from "@/components/CreateProductModal.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/vue-query";

interface Product {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface ApiResponse {
  currentPage: number;
  products: Product[];
  total: number;
  totalPages: number;
}

interface GetProductProps {
  page?: number;
  name?: string;
  limit?: number;
}

const getProducts = async ({ page, name, limit }: GetProductProps) => {
  try {
    const res = await api.get<ApiResponse>("/products", {
      params: {
        page,
        name,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const { data, isLoading, isError, error } = useQuery({
  queryKey: ["products"],
  queryFn: () => getProducts({ page: 1, limit: 10 }),
});
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between mt-3">
      <h1 class="text-2xl font-semibold">Products</h1>

      <CreateProductModal />
    </div>
    <div class="border rounded-md">
      <div v-if="isLoading" class="text-center py-4">
        Carregando produtos...
      </div>

      <div v-if="isError" class="text-center py-4 text-red-500">
        Ocorreu um erro ao carregar os produtos:
        {{ error?.message || "Tente novamente mais tarde." }}
      </div>

      <Table v-if="data?.products">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(product, index) in data.products" :key="product.ID">
            <TableCell>
              {{ index + 1 }}
            </TableCell>
            <TableCell>{{ product.name }}</TableCell>
            <TableCell>{{ product.description }}</TableCell>
            <TableCell>
              {{
                product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </TableCell>
            <TableCell>
              {{ product.quantity }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div v-else class="text-center py-4">Nenhum produto encontrado.</div>
    </div>
  </div>
</template>

<style scoped></style>

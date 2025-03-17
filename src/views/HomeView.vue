<script setup lang="ts">
import CreateProductModal from "@/components/CreateProductModal.vue";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
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
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

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

const route = useRoute();
const router = useRouter();

const currentPage = ref(parseInt(route.query.page as string) || 1);

watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = parseInt(newPage as string) || 1;
  }
);

const { data, isLoading, isError, error } = useQuery({
  queryKey: ["products", currentPage],
  queryFn: () => getProducts({ page: currentPage.value, limit: 10 }),
});

const changePage = (page: number) => {
  router.push({ query: { ...route.query, page } });
};
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

      <!--  -->
    </div>

    <div class="flex items-center justify-end">
      <Pagination
        v-slot="{ page }"
        :items-per-page="10"
        :total="data?.total || 0"
        :sibling-count="1"
        show-edges
        :default-page="currentPage.value"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <!-- <PaginationFirst /> -->
          <PaginationPrev />

          <template v-for="(item, index) in items" :key="index">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-9 h-9 p-0"
                :variant="
                  item.value === currentPage.value ? 'default' : 'outline'
                "
                @click="changePage(item.value)"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext />
          <!-- <PaginationLast /> -->
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>

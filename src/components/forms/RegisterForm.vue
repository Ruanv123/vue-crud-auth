<script setup lang="ts">
import { api } from "@/lib/api";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { z } from "zod";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const route = useRouter();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, { message: "O nome é obrigatório" }),
    email: z
      .string()
      .email({ message: "Digite um email válido" })
      .nonempty({ message: "O email é obrigatório" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
      .nonempty({ message: "A senha é obrigatória" }),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  const res = await api.post("/register", values);

  if (res.data) {
    route.push("/login");
  }
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader>
        <CardTitle class="text-xl">Create your Account</CardTitle>
        <CardDescription>create your account to acces system.</CardDescription>
      </CardHeader>
    </Card>
  </div>
</template>

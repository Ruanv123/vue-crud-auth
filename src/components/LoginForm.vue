<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/lib/api";
import { useAuth } from "@/store/auth";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { RouterLink, useRouter } from "vue-router";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

const { login } = useAuth();
const route = useRouter();

const formSchema = toTypedSchema(
  z.object({
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
  console.log("form submited", values);
  api.post("/login", values).then((res) => {
    console.log(res.data);
    if (res.data) {
      login(res.data.token);
      route.push("/");
    }
  });
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card class="relative">
      <CardHeader class="text-center">
        <div class="absolute inset-0 overflow-hidden rounded-xl">
          <div class="absolute inset-0 opacity-10">
            <div
              v-for="rowIndex in 20"
              :key="'row-' + rowIndex"
              class="flex justify-between"
            >
              <div
                v-for="colIndex in 30"
                :key="'dot-' + rowIndex + '-' + colIndex"
                :class="[
                  'h-1 w-1 rounded-full bg-gray-400',
                  Math.random() > 0.5 ? 'opacity-100' : 'opacity-0',
                ]"
              />
            </div>
          </div>
        </div>
        <CardTitle class="text-xl"> Welcome back </CardTitle>
        <CardDescription> Login with your account </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="space-y-5">
          <div class="space-y-2">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@mail.com"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="your password"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <Button type="submit" class="w-full mt-3"> Submit </Button>
          <div class="text-center text-sm">
            Don't have an account?
            <RouterLink to="/register" class="underline underline-offset-4">
              Sign up
            </RouterLink>
          </div>
        </form>
      </CardContent>
    </Card>
    <div
      class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary"
    >
      By clicking continue, you agree to our
      <RouterLink to="/">Terms of Service</RouterLink> and
      <RouterLink to="/">Privacy Policy</RouterLink>.
    </div>
  </div>
</template>

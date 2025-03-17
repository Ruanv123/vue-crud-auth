import DefaultLayout from "@/components/DefaultLayout.vue";
import { useAuth } from "@/store/auth";
import RegisterView from "@/views/RegisterView.vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DefaultLayout,
    beforeEnter: (to, from, next) => {
      const auth = useAuth();
      auth.checkAuthStatus().then(() => {
        if (auth.isAuthenticated) {
          next();
        } else {
          next("/login");
        }
      });
    },
    children: [
      {
        path: "",
        name: "Home",
        component: HomeView,
      },
    ],
  },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
];

export const router = createRouter({
  history: createWebHistory(), // caso use o memory history nao sera acessivel pela url do navegador
  routes,
});

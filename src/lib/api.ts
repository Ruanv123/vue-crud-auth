import { useAuth } from "@/store/auth";
import axios from "axios";
import { useRouter } from "vue-router";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
});

const router = useRouter();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token"); // Armazene o token JWT no localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado ou não autorizado
      useAuth().logout();
      router.push("/login"); // Redireciona para o login
    }
    return Promise.reject(error);
  }
);

export { api };

import { api } from "@/lib/api";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

interface AuthState {
  isAuthenticated: boolean;
  userProfile: any;
}

export const useAuth = defineStore("auth", {
  state: (): AuthState => ({
    isAuthenticated: !!localStorage.getItem("jwt_token"),
    userProfile: null,
  }),
  actions: {
    async checkAuthStatus() {
      const token = localStorage.getItem("jwt_token");
      if (token) {
        try {
          const response = await api.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data) {
            this.userProfile = response.data;
          } else {
            this.logout();
          }
        } catch (error) {
          this.logout();
        }
      }
    },
    login(token: string) {
      localStorage.setItem("jwt_token", token);
      this.isAuthenticated = true;
    },
    logout() {
      localStorage.removeItem("jwt_token");
      this.isAuthenticated = false;
    },
  },
  getters: {
    getProfile(state) {
      return state.userProfile;
    },
  },
});

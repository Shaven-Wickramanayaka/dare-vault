import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Vault from "../views/Vault.vue";
import { getCurrentUser } from "vuefire";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/vaults/:id",
    name: "Vault",
    component: Vault,
    meta: { requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const user = await getCurrentUser();
    if (!user) {
      alert("Please log in first");
      return "/login";
    }
  }
});
export default router;

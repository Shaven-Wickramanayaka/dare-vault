import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Dashboard from "../components/Dashboard.vue";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import Vault from "../views/Vault.vue";
import { getCurrentUser } from "vuefire";
import Session from "../views/Session.vue";

const routes = [
  { path: "/", name: "Index", component: Index },
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
  {
    path: "/session/:id",
    name: "Session",
    component: Session,
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

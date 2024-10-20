import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { store } from "@/lib/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: (to, from) => {
        if (!store.importedSwaggerDocument) {
          return { path: "/import" };
        }

        return true;
      },
      children: [
        {
          path: "/",
          name: "home.view",
          component: ViewTab,
        },
      ],
    },
    {
      path: "/import",
      name: "about",
      component: () => import("../views/ImportView.vue"),
    },
  ],
});

export default router;

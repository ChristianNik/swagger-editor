import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ViewTab from "../views/ViewTab.vue";
import AddOrEditTab from "../views/AddOrEditTab.vue";
import CodeTab from "../views/CodeTab.vue";
import SwaggerTab from "../views/SwaggerTab.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "/info",
          name: "home.info",
          component: ViewTab,
        },
        {
          path: "/paths",
          name: "home.paths",
          component: ViewTab,
        },
        {
          path: "/tags",
          name: "home.tags",
          component: ViewTab,
        },
        {
          path: "/new",
          name: "home.new",
          component: AddOrEditTab,
        },
        {
          path: "/code",
          name: "home.code",
          component: CodeTab,
        },  {
          path: "/swagger",
          name: "home.swagger",
          component: SwaggerTab,
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

import { createRouter, createWebHistory } from "vue-router";

import AboutPage from "../views/About";
import HomePage from "../views/Home"

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
      },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CoromonDetail from "../views/CoromonDetail.vue";
import WelcomePage from "@/views/WelcomePage.vue";
import TeamBuilder from "@/views/TeamBuilder.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/database", component: HomeView },
    { path: "/coromon/:id", component: CoromonDetail },
    { path: "/", component: WelcomePage },
    { path: "/teambuilder", component: TeamBuilder },
  ],
});

export default router;

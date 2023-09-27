import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/HomeView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Main,
    }    
  ],
});

export default router;

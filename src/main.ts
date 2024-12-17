import Vue from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

Vue.config.productionTip = false;
Vue.config.devtools = false;

const app = new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

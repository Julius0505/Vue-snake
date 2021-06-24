import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import VueGeolocation from 'vue-browser-geolocation';
import '@/assets/css/tailwind.css'
// Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  VueGeolocation,
  render: h => h(App)
}).$mount("#app");

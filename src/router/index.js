import Vue from "vue";
import VueRouter from "vue-router";
import PaymentPage from "../components/PaymentPage.vue";
import Home from "../components/Home.vue";
import BuyMore from "../components/BuyMore.vue";
import ReturnPolicy from "../components/ReturnPolicy.vue";
import CountryDetails from "../components/CountryDetails.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/shop",
    name: "Payment Page",
    component: PaymentPage
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/shop/buy-more",
    name: "Buy More",
    component: BuyMore
  },
  {
    path: "/shop/return-policy",
    name: "Return Policy",
    component: ReturnPolicy
  },
  {
    path: "/shop/country-details",
    name: "Country Details",
    component: CountryDetails
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

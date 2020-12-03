import Vue from "vue";
import VueRouter from "vue-router";
import PaymentPage from "../components/PaymentPage.vue";
import Home from "../components/Home.vue";
import BuyMore from "../components/BuyMore.vue";
import ReturnPolicy from "../components/ReturnPolicy.vue";
import CountryDetails from "../components/CountryDetails.vue";
import Email from "../components/emails/Email.vue";
import Video from "../components/Video.vue";
import ReadMore from "../components/ReadMore.vue";
import PrivacyPolicy from "../components/PrivacyPolicy.vue";
import ErrorPage from "../components/404.vue";
import InstallApp from "../components/InstallApp"
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
  },
  {
    path: "/link/:url",
    name: "Email",
    component: Email
  },
  {
    path: "/watch-me",
    name: "Video",
    component: Video
  },
  {
    path: "/read-more",
    name: "ReadMore",
    component: ReadMore
  },
  {
    path: "/privacy-policy",
    name: "Privacy Policy Page",
    component: PrivacyPolicy
  },
  {
    path: "/not-there",
    name: "404 Page",
    component: ErrorPage
  },
  {
    path: "/app",
    name: "app install",
    component: InstallApp
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
  } 
});

export default router;

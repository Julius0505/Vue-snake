<template>
  <v-app>
    <v-app-bar dense dark :fixed="true"
      ><router-link to="/" v-if="currentRouter !== 'Home'">Home </router-link>
    </v-app-bar>

    <div class="underBar"></div>
    <!-- <div class="contantWrapper"> -->
    <router-view></router-view>
    <!-- </div> -->
  </v-app>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
// import PaymentPage from "./components/PaymentPage";

export default {
  name: "App",

  components: {
    // PaymentPage
  },

  data: () => ({
    //
  }),
  methods: {},
  computed: {
    currentRouter() {
      return this.$router.currentRoute.name;
    }
  }
};
</script>
<style lang="scss">
.underBar {
  padding-top: 37px;
}
.contantWrapper {
  padding: 20px;
  max-width: 1100px;
  margin: auto;
  height: 100%;
}
</style>

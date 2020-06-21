<template>
  <v-app>
    <v-content>
      <PaymentPage />
    </v-content>
  </v-app>
</template>

<script>
import PaymentPage from "./components/PaymentPage";

export default {
  name: "App",

  components: {
    PaymentPage
  },

  data: () => ({
    //
  })
};
</script>

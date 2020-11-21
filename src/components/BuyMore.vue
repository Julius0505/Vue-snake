<template>
  <div class="contantWrapper quantity-section">
    <p>
      If you would like to buy more than five snakes then you will need to
      contact us:
      <a href="mailto:info@plugandplink.com">info@plugandplink.com</a>
    </p>
    <br />
    <p>
      This is so that we can discuss the best shipment options, discounts for
      larger quantities and check our stock availability.
    </p>
  </div>
</template>

<script>
import Vue from "vue";
import VideoBackground from "vue-responsive-video-background-player";
Vue.component("video-background", VideoBackground);
import VueRouter from "vue-router";
Vue.use(VueRouter);

export default {};
</script>

<style lang="scss" scoped>
.quantity-section{
  padding-top: 140px;
  width: 85%;
  margin: 0 auto;
  min-height: calc(100vh - 140px);
}

@media screen and (max-width: 1100px) {
  .quantity-section{
    margin-top: 60px;
  }
  .quantity-section{
    margin: 0 auto;
    width: 85%;
  }
}
@media (max-width: 660px) and (min-width: 320px) {
   .quantity-section{
      margin-top: 0px;
      padding-top: 0px;
      width: 90%;
  }
}
</style>

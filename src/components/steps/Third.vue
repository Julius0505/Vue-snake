<template>
  <div>
    <p class="titlet">
      Please tell us where you would like your snakes delivered to. If your
      destination country is not listed then sorry, we cannot proceed
      <br />
      <span class="underline"> Click for more details</span>
    </p>
    <v-card-text>
      <v-select
        solo
        outlined
        v-model="order.country"
        :items="countries"
        :rules="[v => !!v || 'Please select a country']"
        label="Country"
      ></v-select>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: ["order", "back", "next", "countries"],
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@media screen and (max-width: 500px) {
  .v-menu__content {
    /* margin-left: 0px; */
    min-width: 100vw !important;
  }
}
</style>

<template>
  <div>
    <p class="titlet">
      How many PlugAndPlink snakes do you want to buy ?
    </p>

    <br />
    <v-form v-model="valid" ref="form">
      <v-card-text>
        <v-slider
          thumb-label="always"
          v-model="order.amount"
          label=""
          min="1"
          max="5"
        ></v-slider>
        <p class="underline">I want to buy more than 5 snakes</p>
        <!-- <div class="policy">
          <p class="precheckbox">
            I have read and agree to the
            <span class="underline"> Returns Policy</span>
          </p>
          <v-checkbox v-model="order.policyCheck"></v-checkbox>
        </div>
        <p class="errMsg">You must agree to continue!'</p> -->
        <div class="polic">
          <v-checkbox
            id="policyCheck"
            v-model="order.policyCheck"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="I've read and agree to the"
            required
          ></v-checkbox>
          <span class="spanLink"> Return Policy</span>
        </div>
      </v-card-text>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["order", "stepValid", "back", "next"],
  data() {
    return {
      valid: false,
      checkbox: false
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    }
  },
  watch: {}
};
</script>

<style lang="scss">
.policy {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.spanLink {
  padding-left: 5px;
  text-decoration: underline;
  cursor: pointer;
}
.polic {
  display: flex;
  flex-direction: row;
  align-items: center;
}
@media screen and (max-width: 375px) {
  .v-label {
    font-size: 13px !important;
  }
  .v-slider {
    margin: 0px 12px !important;
  }
  #policyCheck {
    display: none !important;
  }
  .policy {
    font-size: 12px !important;
    /* display: flex;
    flex-direction: row; */
    align-items: center;
    justify-content: space-between;
  }
  .polic {
    font-size: 13px !important;
  }
  .spanLink {
    padding-left: 5px;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>

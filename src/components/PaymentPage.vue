<template>
  <v-container>
    <v-card class="mx-auto" max-width="530">
      <v-tabs class="tabs" v-if="tab < 6" v-model="tab">
        <v-tab>Start</v-tab>
        <v-tab :disabled="disabled2">Country</v-tab>
        <v-tab :disabled="disabled4">Coupon</v-tab>
        <v-tab :disabled="disabledAdress">Adress</v-tab>
        <v-tab :disabled="disabled5">Contacts</v-tab>
        <v-tab :disabled="disabled6">Summary</v-tab>
        <v-tab :disabled="disabled7">Transaction</v-tab>
      </v-tabs>
      <!-- {{ order }} -->

      <v-tabs-items>
        <First
          :back="back"
          :next="next"
          ref="first"
          :order="order"
          v-if="tab === 0"
        />

        <Second
          :isValid="stepsValid.s1"
          :back="back"
          :next="next"
          :order="order"
          v-if="tab === 2"
        />
        <Third
          :back="back"
          :next="next"
          :order="order"
          :countries="countries"
          v-if="tab === 1"
        />
        <Fourth
          :countries="countries"
          :back="back"
          :next="next"
          :order="order"
          v-if="tab === 3"
        />
        <Fifth :back="back" :next="next" :order="order" v-if="tab === 4" />
        <Sixth
          :getPrice="getPrice"
          :back="back"
          :next="next"
          :order="order"
          v-if="tab === 5"
        />
        <Seventh
          :getPrice="getPrice"
          :price="price"
          :currencies="currencies"
          :back="back"
          :next="next"
          :order="order"
          v-if="tab === 6"
        />
      </v-tabs-items>
      <v-card-text class="actions">
        <div>
          <v-btn
            outlined
            v-if="tab != 0"
            color="primary"
            large
            @click="back"
            class="next-button"
            >Back</v-btn
          >
        </div>

        <v-btn
          outlined
          color="primary"
          :disabled="isNext"
          @click="next"
          large
          class="next-button"
          >Next</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import First from "./steps/First.vue";
import Second from "./steps/Second.vue";
import Third from "./steps/Third.vue";
import Fourth from "./steps/Fourth.vue";
import Fifth from "./steps/Fifth.vue";
import Sixth from "./steps/Sixth.vue";
import Seventh from "./steps/Seventh.vue";
export default {
  name: "PaymentPage",
  components: {
    First,
    Second,
    Third,
    Fourth,
    Fifth,
    Sixth,
    Seventh
  },
  data: () => ({
    amount: 1,
    tab: 0,
    price: {
      currency: "GPB"
    },
    order: {
      amount: "",
      policyCheck: false,
      couponCode: "",
      couponIsValid: false,
      discount: 0,
      country: "",
      firstName: "",
      secondName: "",
      postCode: "",
      city: "",
      address: "",
      email: "",
      phone: "",
      currency: ""
    },
    currencies: [],
    // order: {
    //   amount: "",
    //   policyCheck: false,
    //   couponCode: "plugandplink-orgoffer",
    //   couponIsValid: false,
    //   discount: 0,
    //   country: "",
    //   firstName: "Dmitry",
    //   secondName: "Loza",
    //   postCode: "6900",
    //   city: "zsd",
    //   address: "sada21",
    //   email: "ankarn41k@gmail.com",
    //   phone: "+380997453583",
    //   currency: "GBP"
    // },
    stepsValid: {
      s1: false,
      s2: false,
      s3: false,
      s4: false,
      s5: false,
      s6: false,
      s7: false
    }
  }),
  methods: {
    next() {
      this.tab++;
    },
    back() {
      if (this.tab == 6) {
        this.tab = this.tab - 2;
        this.price = {
          currency: "GPB"
        };
      } else this.tab--;
    },
    getCountries: async function() {
      try {
        const countries = await axios.get(
          "https://snakeomatic.com//orders/list-destinations"
        );
        this.countries = countries.data;
      } catch (err) {
        console.log(err);
      }
    },
    getCur: async function() {
      try {
        const currencies = await axios.get(
          "https://snakeomatic.com/orders/list-currencies"
        );
        this.currencies = currencies.data;
        console.log(this.currencies);
      } catch (err) {
        console.log(err);
      }
    },
    getPrice: async function(curr) {
      var currency = "";
      if (curr) {
        currency = `&currency=${curr}`;
      }

      try {
        const price = await axios.post(
          `https://snakeomatic.com/orders/price?country=${this.order.country}&coupon=${this.order.couponCode}${currency}&quantity=${this.order.amount}`
        );
        this.price = price.data;
        this.order.currency = price.data.currency;
        console.log(price);
      } catch (err) {
        console.log(err);
      }
    },
    /*eslint no-useless-escape: 0*/
    texter: function() {
      var format = /[!@#$%^&*()_\=\[\]{};':"\\|,.<>\/?qwertyuiopasdfghjkl;zxcvbnm,.]+/;
      if (format.test(this.order.phone)) {
        return false;
      } else {
        return true;
      }
    }
  },
  created: function() {
    this.getCountries();
    this.getCur();
  },
  computed: {
    isNext() {
      if (this.tab === 0) {
        return this.disabled2;
      } else if (this.tab === 1) {
        return this.disabled4;
      } else if (this.tab === 2) {
        return this.disabledAdress;
      } else if (this.tab === 3) {
        return this.disabled5;
      } else if (this.tab === 4) {
        return this.disabled6;
      } else return false;
    },
    disabled2() {
      if (this.order.policyCheck !== true) {
        return true;
      } else return false;
    },
    disabledAdress() {
      if (
        !this.disabled4 &&
        (!this.order.couponCode || this.order.discount != 0)
      ) {
        return false;
      } else return true;
    },
    disabled4() {
      if (!this.order.country) {
        return true;
      } else return false;
    },
    disabled5() {
      if (
        this.order.firstName &&
        this.order.postCode &&
        this.order.city &&
        this.order.address &&
        this.order.firstName.length <= 30 &&
        this.order.secondName.length <= 30 &&
        this.order.postCode.length <= 15
      ) {
        return false;
      } else return true;
    },
    disabled6() {
      if (
        /.+@.+\..+/.test(this.order.email) &&
        this.order.phone.length >= 7 &&
        this.order.firstName.length <= 15 &&
        this.texter()
      )
        return false;
      else return true;
    },
    disabled7() {
      if (this.price.grandTotal && this.price.quantity == this.order.amount) {
        return false;
      } else return true;
    }
  }
};
</script>
<style lang="scss">
* {
  font-family: "McLaren", cursive !important;
}
.v-card {
  overflow-x: hidden;
  overflow-y: auto;
}
.amount {
  margin: 0 20px;
}
.card-title {
  text-align: center !important;
}
.titlet {
  font-family: "McLaren", cursive !important;
  padding: 16px;
}
.v-card__title {
  word-break: break-all !important;
}

.primaryColor {
  color: #4db6ac;
}
.underline {
  cursor: pointer;
  text-decoration: underline;
}
p {
  font-family: "McLaren", cursive !important;
  margin: 0 !important;
  font-size: 20px;

  color: white;
}

.actions {
  display: flex;
  justify-content: space-between;
}
.v-card__text {
  padding-top: 0;
}
.tabs {
  /* margin-left: -35px; */
  padding: 0;
}

@media screen and (max-width: 500px) {
  p {
    font-size: 16px;
  }
  .v-card__text {
    padding: 10px;
  }
  .titlet {
    font-size: 16px;
    padding: 10px;
  }
  .container {
    padding: 0 !important;
  }
}
@media screen and (max-width: 1200px) {
  .tabs {
    margin-left: -25px;
  }
  .v-slide-group__wrapper {
    width: 500px !important;
  }
}
</style>

<template>
  <v-card-text :key="tab">
    <v-progress-circular
      v-if="loading"
      :size="300"
      :width="40"
      color="primary"
      indeterminate
    ></v-progress-circular>
    <div class="message" v-if="result">
      <v-card-title v-if="result && !error">
        Thank you for your order! You'll receive a confirmation on your email!
      </v-card-title>
      <v-card-title v-if="error">
        Sorry, something went wrong.
      </v-card-title>
    </div>
    <div v-if="!result">
      <p class="price" v-if="!loading || !result">
        {{ `${this.price.grandTotal / 100} ${this.price.currency}` }}
      </p>
      <div>
        <div class="card" ref="card"></div>
      </div>
      <br />

      <v-checkbox
        id="policyCheck"
        v-model="adressStatus"
        label="Billing address is the same as shipping"
        required
      ></v-checkbox>
      <v-form v-if="!adressStatus">
        <v-card-text>
          <div class="name">
            <v-text-field
              label="First name"
              :rules="[
                v => !!v || 'Name is required',
                v => v.length <= 30 || 'Max 30 characters'
              ]"
              outlined
              v-model="billing.firstName"
            ></v-text-field>
            <v-text-field
              :rules="[v => v.length <= 30 || 'Max 30 characters']"
              label="Second name"
              outlined
              v-model="billing.secondName"
            ></v-text-field>
          </div>

          <div class="country">
            <v-text-field
              v-model="billing.country"
              :rules="[v => !!v || 'Country  is required']"
              outlined
              label="Country"
            ></v-text-field>
            <v-text-field
              label="Post code"
              outlined
              v-model="billing.postCode"
              :rules="[
                v => !!v || 'Required',
                v => v.length <= 15 || 'Max 15 characters'
              ]"
              id="postCode"
            ></v-text-field>
          </div>

          <v-text-field
            :rules="[v => !!v || 'City is required']"
            label="City"
            outlined
            v-model="billing.city"
          ></v-text-field>
          <v-textarea
            :rules="[v => !!v || 'Required']"
            label="Adress"
            outlined
            v-model="billing.address"
          ></v-textarea>
        </v-card-text>
      </v-form>
      <v-btn
        large
        class="submitPayment"
        @click="payNow"
        outlined
        color="primary"
        >Pay now</v-btn
      >
    </div>
  </v-card-text>
</template>
<script src="https://js.stripe.com/v3/"></script>

<script>
/* eslint-disable no-unused-vars */

let stripe = Stripe(
    "pk_test_51GwqHLBFCoJ8vqH8CqGQTokpO0owv9in81AkKc5197KAEjmfX4PqArBcB735hEgx1aEWAKsGu8XDDhcE7ZwFz5DU00z0M9qUPH"
  ),
  elements = stripe.elements(),
  card = undefined;
let style = {
  invalid: {
    // All of the error styles go inside of here. pi_1Gygfw2T3o5wGswk08bog5CB
  }
};

import axios from "axios";
export default {
  props: ["price", "secretKey", "order", "tab"],
  data() {
    return {
      loading: false,
      result: false,
      error: false,
      amount: 0,
      currency: "EUR",
      adressStatus: true,
      billing: {
        country: "",
        firstName: "",
        secondName: "",
        postCode: "",
        city: "",
        address: ""
      }
    };
  },
  computed: {
    billingOb: function() {
      if (!this.adressStatus) {
        return this.order;
      } else return this.billing;
    }
  },
  methods: {
    payNow() {
      let self = this;
      this.loading = true;
      stripe
        .confirmCardPayment(this.secretKey, {
          payment_method: {
            card: card,
            billing_details: {
              name: `${this.billingOb.firstName} ${this.billingOb.secondName}`,
              email: this.order.email
            }
          }
        })
        .then(function(result) {
          if (result.error) {
            self.loading = false;
            self.result = true;
            self.error = true;
            console.log(result.error.message);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              console.log(result);
              self.loading = false;
              self.result = true;
            }
          }
        });
    },

    validate() {
      this.$refs.form.validate();
    }
  },
  beforeDestroy() {
    card.destroy();
    card = null;
  },
  mounted: function() {
    if (!card) {
      card = elements.create("card", {
        style: {
          base: {
            //   height: "42px",
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,

            fontSize: "16px",
            fontSmoothing: "antialiased",

            ":-webkit-autofill": {
              color: "#fce883"
            },
            "::placeholder": {
              color: "#FFFFFF"
            }
          },
          invalid: {
            iconColor: "#FF5252",
            color: "#FF5252"
          }
        }
      });
      card.mount(this.$refs.card);
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  padding: 20px;
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.v-card__title {
  word-break: break-all !important;
}
.card {
  padding: 13px;
  margin-top: 10px;
  border: 1px solid #545454;
  border-radius: 5px;
}
.price {
  padding: 20px;
  font-size: 26px;
  width: 100%;
  text-align: center;
}
.submitPayment {
  width: 100%;
}
</style>

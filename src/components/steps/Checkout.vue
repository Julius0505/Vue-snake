<template>
  <div>
    <v-card-text class="wrapp">
      <div class="loadingWrapper">
        <v-progress-circular
          v-if="loading"
          :size="300"
          :width="40"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div class="message" v-if="result">
        <p class="resultMsg" v-if="result && !error">
          Thank you for your order. An email message confirming your order has
          been sent to {{ order.email }}. We will let you know when your snakes
          have been dispatched.
        </p>
        <p class="resultMsg" v-if="error">
          Sorry, something went wrong.
        </p>
      </div>
      <div>
        <v-card-text>
          <p class="price" v-if="!loading || !result">
            {{ `${this.price.grandTotal / 100} ${this.price.currency}` }}
          </p>
        </v-card-text>
        <div id="card-container" v-if="!noCardForm" ref="card">
          <label class="label_card_number" :style="cardNumberInput.style"
            >Card Number</label
          >
          <div id="card-number"></div>
          <div id="card-number-error" class="errMsg">
            {{ cardNumberInput.errMsg }}
          </div>
          <div class="flex flex-row gap-4 mt-4 card-expiry-cvc">
            <div class="flex-1">
              <label class="label_card_expiry" :style="cardExpiryInput.style"
                >Card Expiry MM/YY</label
              >
              <div id="card-expiry"></div>
              <div id="card-expiry-error" class="errMsg">
                {{ cardExpiryInput.errMsg }}
              </div>
            </div>
            <div class="flex-1">
              <label class="label_card_cvc" :style="cardCvcInput.style"
                >Card CVC</label
              >
              <div id="card-cvc"></div>
              <div id="card-cvc-error" class="errMsg">
                {{ cardCvcInput.errMsg }}
              </div>
            </div>
          </div>
        </div>
        <br />
        <v-checkbox
          v-if="!result && !loading"
          id="policyCheck"
          v-model="adressStatus"
          label="Billing address is the same as shipping"
          required
        ></v-checkbox>
        <v-form v-if="!adressStatus && !result && !loading" ref="form">
          <v-card-text>
            <div class="userTitle">
              <v-text-field
                label="Title"
                :rules="[
                  v => !!v || 'Title is required',
                  v => v.length <= 5 || 'Max 5 characters'
                ]"
                outlined
                v-model="billing.title"
              ></v-text-field>
            </div>
            <div class="nameCheckout">
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
                class="secondName"
                :rules="[v => v.length <= 30 || 'Max 30 characters']"
                label="Last name"
                outlined
                v-model="billing.secondName"
              ></v-text-field>
            </div>

            <div class="country">
              <v-text-field
                class="countryField"
                label="Country"
                outlined
                v-model="billing.country"
                :rules="[
                  v => !!v || 'Country is required',
                  v => v.length <= 15 || 'Max 15 characters'
                ]"
              ></v-text-field>
              <v-text-field
                class="postCode"
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
              :rules="[v => v.length <= 45 || 'Max 45 characters']"
              label="Province / State"
              outlined
              v-model="billing.state"
            ></v-text-field>
            <v-text-field
              :rules="[
                v => !!v || 'City is required',
                v => v.length <= 45 || 'Max 45 characters'
              ]"
              label="City"
              outlined
              v-model="billing.city"
            ></v-text-field>
            <v-text-field
              :rules="[
                v => !!v || 'Address is required',
                v => v.length <= 45 || 'Max 45 characters'
              ]"
              label="Address line 1"
              outlined
              v-model="billing.address1"
            ></v-text-field>
            <v-text-field
              :rules="[v => v.length <= 45 || 'Max 45 characters']"
              label="Address line 2"
              outlined
              v-model="billing.address2"
            ></v-text-field>
          </v-card-text>
        </v-form>
        <div
          v-if="!adressStatus && !result && !loading"
          @click="validateForm"
          class="valid"
        ></div>
        <v-btn
          v-if="!result && !loading"
          :disabled="!isPayNowActive"
          large
          class="submitPayment"
          @click="payNow"
          outlined
          color="primary"
          >Pay now</v-btn
        >
      </div>
      <div class="btn-div">
        <router-link to="/" class="link">
          <v-btn v-if="result && !error" large outlined color="primary"
            >Back</v-btn
          >
        </router-link>
      </div>
    </v-card-text>
  </div>
</template>
<script src="https://js.stripe.com/v3/"></script>

<script>
/* eslint-disable no-unused-vars */
//  let hostname = window.location.hostname
//     if(hostname !="plugandplink.com") {
// let stripe = Stripe(
//     "pk_test_51GwqHLBFCoJ8vqH8CqGQTokpO0owv9in81AkKc5197KAEjmfX4PqArBcB735hEgx1aEWAKsGu8XDDhcE7ZwFz5DU00z0M9qUPH"
//   ),
//   elements = stripe.elements(),
//   card = undefined;
//     } else {
//       let stripe = Stripe(
//     "pk_live_51GwqHLBFCoJ8vqH8FUMwGcDuMFW9NqBjjcCYaCkVqnhMPHMXTBFDxIc5iCMpPJ0sEMSDpAo2YI7PKNWl7sxK08TV00Q39Jx2ag"
//   ),
//   elements = stripe.elements(),
//   card = undefined;
//     }
let stripe;
let hostname = window.location.hostname;
if (hostname != "plugandplink.com") {
  stripe = Stripe(
    "pk_test_51GwqHLBFCoJ8vqH8CqGQTokpO0owv9in81AkKc5197KAEjmfX4PqArBcB735hEgx1aEWAKsGu8XDDhcE7ZwFz5DU00z0M9qUPH"
  );
} else {
  stripe = Stripe(
    "pk_live_51GwqHLBFCoJ8vqH8FUMwGcDuMFW9NqBjjcCYaCkVqnhMPHMXTBFDxIc5iCMpPJ0sEMSDpAo2YI7PKNWl7sxK08TV00Q39Jx2ag"
  );
}
let elements = stripe.elements();
let cardNumber = null;
let cardExpiry = null;
let cardCvc = null;
const style = {
  base: {
    // height: "32px",
    iconColor: "#c4f0ff",
    color: "#fff",
    hideIcon: "false",
    fontSize: "16px",
    fontFamily: '"McLaren", sans-serif',
    fontWeight: "500",
    fontSmoothing: "antialiased",
    ":-webkit-autofill": {
      backgroundColor: "transparent",
      color: "#fff"
    },
    "::placeholder": {
      color: "transparent"
    }
  },
  invalid: {
    iconColor: "#FF5252",
    color: "#FF5252"
  },
  complete: {
    backgroundColor: "transparent",
    color: "#fff"
  }
};
import axios from "axios";
export default {
  props: ["price", "secretKey", "order", "tab", "setResult"],
  data() {
    return {
      noCardForm: false,
      stripeValidationError: "",
      cardInputComplete: false,
      cardNumberInput: {
        name: "card-number",
        complete: false,
        empty: true,
        errMsg: "",
        style: {}
      },
      cardExpiryInput: {
        expiry: "card-expiry",
        complete: false,
        empty: true,
        errMsg: "",
        style: {}
      },
      cardCvcInput: {
        cvc: "card-cvc",
        complete: false,
        empty: true,
        errMsg: "",
        style: {}
      },
      loading: false,
      result: false,
      error: false,
      cardErrorMsg: "",
      amount: 0,
      currency: "EUR",
      adressStatus: true,
      billing: {
        title: "",
        country: "",
        firstName: "",
        secondName: "",
        postCode: "",
        province: "",
        city: "",
        address1: "",
        address2: ""
      }
    };
  },
  computed: {
    stripeElements() {
      return this.$stripe.elements();
    },
    isPayNowActive() {
      if (
        (this.cardInputComplete && this.adressStatus == true) ||
        (this.cardInputComplete &&
          this.billing.title &&
          this.billing.firstName &&
          this.billing.postCode &&
          this.billing.city &&
          this.billing.address1 &&
          this.billing.firstName.length <= 30 &&
          this.billing.secondName.length <= 30 &&
          this.billing.postCode.length <= 15)
      ) {
        return true;
      }
    },
    billingOb: function() {
      if (!this.adressStatus) {
        return this.order;
      } else return this.billing;
    }
  },
  methods: {
    async createToken() {
      const { token, error } = await this.$stripe.createToken(this.cardNumber);
      if (error) {
        // handle error here
        document.getElementById("card-error").innerHTML = error.message;
        return;
      }
      console.log(token);
      // handle the token
      // send it to your server
    },
    validateForm() {
      if (!this.cardInputComplete) {
        this.cardErrorMsg = "Your card number is incomplete.";
      }
      if (!this.adressStatus) {
        this.$refs.form.validate();
      }
    },
    payNow() {
      this.loading = true;
      let self = this;
      this.setResult(true);
      this.$stripe
        .confirmCardPayment(this.secretKey, {
          payment_method: {
            card: cardNumber,
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
            self.setResult(false);
            self.cardErrorMsg = result.error.message;
            console.log(result.error.message);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              self.loading = false;
              self.result = true;
              self.noCardForm = true;
            }
          }
        });
    }
  },
  beforeDestroy() {
    cardNumber.destroy();
    cardExpiry.destroy();
    cardCvc.destroy();
    cardNumber = null;
    cardExpiry = null;
    cardCvc = null;
  },
  mounted: function() {
    let stripeElements = this.$stripe.elements({
      fonts: [
        {
          cssSrc:
            "https://fonts.googleapis.com/css2?family=McLaren&display=swap"
        }
      ]
    });
    let self = this;
    cardNumber = stripeElements.create("cardNumber", { style });
    cardNumber.mount("#card-number");
    cardExpiry = stripeElements.create("cardExpiry", { style });
    cardExpiry.mount("#card-expiry");
    cardCvc = stripeElements.create("cardCvc", { style });
    cardCvc.mount("#card-cvc");

    cardNumber.on("change", function(event) {
      if (event.complete) {
        self.cardNumberInput.complete = true;
        self.cardInputComplete =
          self.cardExpiryInput.complete && self.cardCvcInput.complete;
      } else {
        self.cardNumberInput.complete = false;
        self.cardInputComplete = false;
      }
      if (event.error) {
        self.cardNumberInput.errMsg = event.error.message;
        self.cardNumberInput.style.color = "#ff5252";
      } else {
        self.cardNumberInput.errMsg = "";
        self.cardNumberInput.style.color = "#4eaf33";
      }
      self.cardNumberInput.empty = event.empty;
      cardNumber.update({ style });
    });
    cardExpiry.on("change", function(event) {
      if (event.complete) {
        self.cardExpiryInput.complete = true;
        self.cardInputComplete =
          self.cardNumberInput.complete && self.cardCvcInput.complete;
      } else if (!event.complete) {
        self.cardExpiryInput.complete = false;
        self.cardInputComplete = false;
      }
      if (event.error) {
        self.cardExpiryInput.errMsg = event.error.message;
        self.cardExpiryInput.style.color = "#ff5252";
      } else {
        self.cardExpiryInput.errMsg = "";
        self.cardExpiryInput.style.color = "#4eaf33";
      }
      self.cardExpiryInput.empty = event.empty;
    });
    cardCvc.on("change", function(event) {
      if (event.complete) {
        self.cardCvcInput.complete = true;
        self.cardInputComplete =
          self.cardExpiryInput.complete && self.cardNumberInput.complete;
      } else if (!event.complete) {
        self.cardCvcInput.complete = false;
        self.cardInputComplete = false;
      }
      if (event.error) {
        self.cardCvcInput.errMsg = event.error.message;
        self.cardCvcInput.style.color = "#ff5252";
      } else {
        self.cardCvcInput.errMsg = "";
        self.cardCvcInput.style.color = "#4eaf33";
      }
      self.cardCvcInput.empty = event.empty;
    });
    cardNumber.on("focus", function(elType) {
      self.cardNumberInput.style = {
        bottom: "-18px",
        background: "rgba(0, 0, 0, 0.9)",
        padding: "0px 3px",
        color: "#4eaf33",
        fontSize: "12px",
        webkitTransition: "bottom .2s ease-in-out,  font-size .2s ease-in-out",
        transition: "bottom .2s ease-in-out,  font-size .2s ease-in-out"
      };
      self.cardNumberInput.style.color =
        self.cardNumberInput.errMsg == "" ? "#4eaf33" : "#ff5252";
    });
    cardNumber.on("blur", function(elType) {
      if (self.cardNumberInput.empty) {
        self.cardNumberInput.style = {};
      }
      if (self.cardNumberInput.errMsg == "")
        self.cardNumberInput.style.color = "#fde8e8";
    });
    cardExpiry.on("focus", function(elType) {
      self.cardExpiryInput.style = {
        bottom: "-18px",
        background: "rgba(0, 0, 0, 0.9)",
        padding: "0px 3px",
        color: "#4eaf33",
        fontSize: "12px",
        webkitTransition: "bottom .2s ease-in-out,  font-size .2s ease-in-out",
        transition: "bottom .2s ease-in-out,  font-size .2s ease-in-out"
      };
      self.cardExpiryInput.style.color =
        self.cardExpiryInput.errMsg == "" ? "#4eaf33" : "#ff5252";
    });
    cardExpiry.on("blur", function(elType) {
      if (self.cardExpiryInput.empty) {
        self.cardExpiryInput.style = {};
      }
      if (self.cardExpiryInput.errMsg == "")
        self.cardExpiryInput.style.color = "#fde8e8";
    });
    cardCvc.on("focus", function(elType) {
      self.cardCvcInput.style = {
        bottom: "-18px",
        background: "rgba(0, 0, 0, 0.9)",
        padding: "0px 3px",
        color: "#4eaf33",
        fontSize: "12px",
        webkitTransition: "bottom .2s ease-in-out,  font-size .2s ease-in-out",
        transition: "bottom .2s ease-in-out,  font-size .2s ease-in-out"
      };
      self.cardCvcInput.style.color =
        self.cardCvcInput.errMsg == "" ? "#4eaf33" : "#ff5252";
    });
    cardCvc.on("blur", function(elType) {
      if (self.cardCvcInput.empty) {
        self.cardCvcInput.style = {};
      }
      if (self.cardCvcInput.errMsg == "")
        self.cardCvcInput.style.color = "#fde8e8";
    });
  }
};
</script>

<style lang="scss" scoped>
.nameCheckout {
  display: flex;
  flex-direction: row;
}
.firstName {
  width: 50% !important;
}
.resultMsg {
  word-wrap: break-word !important;
}
.message {
  padding: 20px;
  padding-bottom: 0;
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
.errMsg {
  position: absolute;
  padding: 0px 12px;
  font-size: 12px;
  color: #ff5252;
}
.valid {
  width: calc(100% - 31px);
}
.loadingWrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 500px) {
  .resultMsg {
    font-size: 16px !important;
  }
}
.wrapp {
  padding: 20px;
}
.btn-div {
  padding-top: 20px;
}
.link {
  text-decoration: none;
}
#custom-button {
  height: 30px;
  outline: 1px solid grey;
  background-color: green;
  padding: 5px;
  color: white;
}
#card-number,
#card-expiry,
#card-cvc {
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #545454;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  // margin-bottom: 36px;
  // margin-top: -30px;
}
#card-number:hover,
#card-expiry:hover,
#card-cvc:hover {
  border: 1px solid #fde8e8;
}
#card-container {
  width: 80%;
  margin: auto;
}
#card-error {
  color: ff5252;
}
.StripeElement--focus {
  border: 2px solid #4eaf33 !important;
  // margin-top: 0px !important;
}
.StripeElement--invalid {
  border: 2px solid #ff5252 !important;
}
.StripeElement--complete {
  background-color: transparent !important;
}
.label_card_number,
.label_card_expiry,
.label_card_cvc {
  margin-left: 12px;
  position: relative;
  bottom: -40px;
}

@media screen and (max-width: 500px) {
  .card-expiry-cvc {
    // display: flex;
    flex-direction: column !important;
  }
  #card-container {
    width: 90%;
  }
}
</style>

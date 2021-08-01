<template>
  <div v-if="price && typeof price.snakesTotalPreDiscount == 'number'">
    <v-card-text>
      <div class="titlet">
        <p>
          Transaction details
        </p>
        <v-menu offset-y class="curr-menu">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              {{ order.currency }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in currencies"
              :key="index"
              @click="changeCurr(item)"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- <v-select
          v-if="price"
          class="selecting"
          solo
          outlined
          v-model="curr"
          :items="currencies"
        ></v-select> -->
        <!-- :change="changeCurr()" -->
        <!-- <p class="primaryColor">US $</p> -->
      </div>
      <v-list v-if="price">
        <v-list-item>
          <div class="grid">
            <p>
              Snakes
              {{
                ` ${order.amount} * ${Number(
                  price.snakeUnitPrice / 100
                ).toFixed(2)}:`
              }}
            </p>
            <p class="primaryColor">
              {{
                `${Number(price.snakesTotalPreDiscount / 100).toFixed(2)} ${
                  price.currency
                }`
              }}
            </p>
          </div>
        </v-list-item>
        <v-list-item>
          <div class="grid">
            <p>{{ `Discount (${this.price.couponDiscountPercentage}%)` }}</p>
            <p class="primaryColor">
              {{
                `${Number(this.price.couponDiscountAmount / 100).toFixed(2)} ${
                  price.currency
                }`
              }}
            </p>
          </div>
        </v-list-item>

        <v-list-item>
          <div class="grid">
            <p>Snakes Subtotal:</p>
            <p class="primaryColor">
              {{
                `${Number(price.snakesTotalPostDiscount / 100).toFixed(2)} ${
                  price.currency
                }`
              }}
            </p>
          </div>
        </v-list-item>

        <v-list-item>
          <div class="grid">
            <p>{{ `Sales Tax (${price.salesTaxPercentage}%):` }}</p>
            <p class="primaryColor">
              {{
                `${Number(price.salesTaxTotal / 100).toFixed(2)} ${
                  price.currency
                }`
              }}
            </p>
          </div>
        </v-list-item>
        <v-list-item>
          <div class="grid">
            <p>Postage and packaging</p>
            <p class="primaryColor">
              {{
                `${Number(price.postageAndPackaging / 100).toFixed(2)}${
                  price.currency
                }`
              }}
            </p>
          </div>
        </v-list-item>
        <v-list-item>
          <div class="grid">
            <p>Total</p>
            <p class="primaryColor">
              {{
                `${Number(price.grandTotal / 100).toFixed(2)}${price.currency}`
              }}
            </p>
          </div>
        </v-list-item>
      </v-list>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: ["order", "currencies", "getPrice", "price"],
  data() {
    return {
      curr: ""
    };
  },

  methods: {
    changeCurr: async function(curr) {
      this.getPrice(curr);
    }
  },
  created() {
    this.getPrice();
  }
};
</script>

<style lang="scss" scoped>
.primaryColor {
  word-break: break-all !important;
  text-align: right;
}

.grid {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.v-list {
  padding: 0;
}
.titlet {
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: raw;
  justify-content: space-between;
}
.v-list-item__title {
  display: grid !important;
  text-align: center;
}
@media screen and (max-width: 500px) {
  .v-menu__content {
    /* margin-left: 0px; */
    min-width: 96px !important;
    max-height: calc(100vh - 246px) !important;
  }
}
</style>

<template>
  <div>
    <p class="titlet">
      Please check your delivery details before proceeding to the biling page.
    </p>
    <v-card-text>
      <v-list>
        <v-list-item>
          <div class="grid">
            <p>Quantity:</p>
            <p class="primaryColor">{{ order.amount }}{{ amountName }}</p>
          </div>
        </v-list-item>
        <v-list-item>
          <div class="grid">
            <p>Recipient:</p>
            <p class="primaryColor">
              {{ `${order.firstName} ${order.secondName}` }}
            </p>
          </div>
        </v-list-item>

        <v-list-item>
          <div class="grid">
            <p>Address:</p>
            <p class="primaryColor">
              {{ `${order.address} ${order.postCode} ${order.city}` }}
            </p>
          </div>
        </v-list-item>

        <v-list-item>
          <div class="grid">
            <p>Phone:</p>
            <p class="primaryColor">
              {{ order.phone }}
            </p>
          </div>
        </v-list-item>
        <v-list-item>
          <div class="grid">
            <p>Email:</p>
            <p class="primaryColor">
              {{ order.email }}
            </p>
          </div>
        </v-list-item>
      </v-list>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: ["order", "back", "next", "getPrice"],
  computed: {
    amountName() {
      if (this.order.amount === 1) return " snake";
      else return " snakes";
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
  justify-content: space-between;
}
.v-list {
  padding: 0;
}
.v-list-item {
  padding: 0;
}
</style>

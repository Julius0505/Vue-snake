<template>
  <div class="flex-2 flex flex-row h-full mt-8 gap-8">
    <div class="flex-1 create-coupon">
      <div
        class="list-title flex flex-col justify-start gap-4 my-4 items-start"
      >
        <div class="flex flex-row  items-center justify-center gap-4 w-full">
          <h4 class="text-gray-600 font-bold text-2xl self-center">
            Create Delivery Tracking
          </h4>
        </div>
      </div>
      <form class="flex items-center justify-center">
        <div class="grid bg-white rounded-lg shadow-xl">
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Order Nummber</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plthird  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="text"
              placeholder="Order Number"
            />
          </div>
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Tracking String</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plthird  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="text"
              placeholder="Tracking String"
            />
          </div>
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Percentage</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plthird  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="number"
              placeholder="Percentage"
            />
          </div>
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Delivery Company</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plthird  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="text"
              placeholder="Delivery Company"
            />
          </div>
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Password</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plthird  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="password"
              placeholder="Password"
            />
          </div>

          <div
            class="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5"
          >
            <button
              class="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Cancel
            </button>
            <button
              class="w-auto bg-plprimary hover:bg-opacity-70 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      deliveryTracking: {
        orderNumber: "",
        trackingString: "",
        company: "",
        password: ""
      },
      post: {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      },
      env: "snakeomatic"
    }
  },
  methods: {
    async createTracking() {

      const result = await fetch(
        `https://exchange.${this.env}.com/orders/add-tracking?orderNumber=${this.deliveryTracking.orderNumber}&trackingString=${this.deliveryTracking.trackingString}&deliveryCompany=${this.deliveryTracking.company}&password=${this.deliveryTracking.password}`,
        this.post
      );

      const val = await result.json();

      return val;
    }
  }
};
</script>

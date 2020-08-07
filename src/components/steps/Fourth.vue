<template>
  <div>
    <p class="titlet">
      Please enter the destination address for your order
    </p>
    <v-form>
      <v-card-text>
        <div class="userTitle">
          <v-text-field
            label="Title"
            :rules="[
              v => !!v || 'Title is required',
              v => v.length <= 5 || 'Max 5 characters'
            ]"
            outlined
            v-model="order.title"
          ></v-text-field>
        </div>
        <div class="name">
          <v-text-field
            class="firstName"
            label="First name"
            :rules="[
              v => !!v || 'Name is required',
              v => v.length <= 30 || 'Max 30 characters'
            ]"
            outlined
            v-model="order.firstName"
          ></v-text-field>
          <v-text-field
            class="secondName"
            :rules="[v => v.length <= 30 || 'Max 30 characters']"
            label="Second name"
            outlined
            v-model="order.secondName"
          ></v-text-field>
        </div>

        <div class="country">
          <v-select
            class="countryInput"
            v-model="order.country"
            :rules="[v => !!v || 'Country  is required']"
            solo
            outlined
            :items="countries"
            label="Country"
          ></v-select>
          <v-text-field
            class="postCode"
            label="Post code"
            outlined
            v-model="order.postCode"
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
          v-model="order.state"
        ></v-text-field>
        <v-text-field
          :rules="[
            v => !!v || 'City is required',
            v => v.length <= 45 || 'Max 45 characters'
          ]"
          label="City"
          outlined
          v-model="order.city"
        ></v-text-field>
        <v-text-field
          :rules="[
            v => !!v || 'Address is required',
            v => v.length <= 45 || 'Max 45 characters'
          ]"
          label="Address line 1"
          outlined
          v-model="order.address1"
        ></v-text-field>
        <v-text-field
          :rules="[v => v.length <= 45 || 'Max 45 characters']"
          label="Address line 2"
          outlined
          v-model="order.address2"
        ></v-text-field>
      </v-card-text>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["order", "back", "next", "countries"],
  data() {
    return {
      firstName: "",
      secondName: "",
      country: "",
      postCode: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      phone: "",
      email: ""
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>

<style lang="scss">
.userTitle {
  width: calc(50% - 7.5px);
}
.name {
  display: flex;
  flex-direction: row;
}
.firstName {
  flex: 0 1 50% !important;
}
.secondName {
  margin-left: 15px !important;
  flex: 0 1 50% !important;
}
.country {
  display: flex;
  flex-direction: row;
  /* align-items: center;
  grid-template-columns: 5fr 2fr;
  grid-gap: 15px; */
}
.countryInput {
  flex: 0 1 70% !important;
}
.postCode {
  margin-left: 15px !important;
  flex: 0 1 30% !important;
}
.dropdown {
}
.v-select__slot {
  height: 56px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  .v-label {
    margin: 0 !important;
    padding: 0 !important;
  }
  .v-select__selection {
    margin: 0 !important;
    padding: 0 !important;
  }
}

@media screen and (max-width: 500px) {
  .v-input__control {
  }
  .country {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    grid-gap: 0;
  }

  #postCode {
    width: 100%;
  }
  .secondName {
    margin-left: none;
  }
  .postCode {
    margin-left: 0 !important;
    width: 100%;
  }
}
</style>

<template>
  <div>
    <p class="titlet">
      Please enter the destination address for your order
    </p>
    <v-form>
      <v-card-text>
        <div class="name">
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
            label="First name"
            :rules="[
              v => !!v || 'Name is required',
              v => v.length <= 30 || 'Max 30 characters'
            ]"
            outlined
            v-model="order.firstName"
          ></v-text-field>
          <v-text-field
            :rules="[v => v.length <= 30 || 'Max 30 characters']"
            label="Second name"
            outlined
            v-model="order.secondName"
          ></v-text-field>
        </div>

        <div class="country">
          <v-select
            v-model="order.country"
            :rules="[v => !!v || 'Country  is required']"
            solo
            outlined
            :items="countries"
            label="Country"
          ></v-select>
          <v-text-field
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
          :rules="[v => !!v || 'City is required']"
          label="City"
          outlined
          v-model="order.city"
        ></v-text-field>
        <v-textarea
          :rules="[v => !!v || 'Adress']"
          label="Adress"
          outlined
          v-model="order.address"
        ></v-textarea>
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
      city: "",
      adress: "",
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
.name {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
}
.country {
  display: grid;
  align-items: center;
  grid-template-columns: 5fr 2fr;
  grid-gap: 15px;
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
  #postCode {
    width: 100%;
  }
  .name {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
  .country {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
}
</style>

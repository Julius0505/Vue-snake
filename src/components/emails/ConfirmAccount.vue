<template>
  <div>
    "Confirmed"
    {{ msg }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      msg: ""
    };
  },
  mounted() {
    let token = this.$router.currentRoute.fullPath
      .split("")
      .slice(60)
      .join("");

    console.log(token);
    axios
      .post(
        `https://exchange.snakeomatic.com/web/link/response?allParams=${token}`
      )
      .then(res => {
        console.log(res);
        this.msg = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped></style>

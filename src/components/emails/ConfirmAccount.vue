<template>
  <div>
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
    console.log("Confirm page");
    let indexToSlice = this.$router.currentRoute.fullPath.indexOf("token") + 6;
    let token = this.$router.currentRoute.fullPath
      .split("")
      .slice(indexToSlice)
      .join("");

    console.log(token);
    axios
      .post(
        `https://exchange.snakeomatic.com/web/link/response?purpose=account-acknowledgement&token=${token}`
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

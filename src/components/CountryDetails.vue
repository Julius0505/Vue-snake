<template>
  <div class="contantWrapper details-section">
    We currently only ship to the UK and the European Union. We hope to ship to
    more countries worldwide as soon as we have distribution arrangements ready
    and FCC testing completed.
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

.details-section{
  width: 85%;
  padding-top: 140px;
  margin: 0px auto;
  min-height: calc(100vh - 140px);
}

@media screen and (max-width: 992px){
  .details-section{
    padding-top: 100px;
  }
}

@media screen and (max-width: 660px){
  .details-section{
    margin: 0px auto;
    max-width: 100%;
    padding-top: 30px !important;
  }
}
</style>

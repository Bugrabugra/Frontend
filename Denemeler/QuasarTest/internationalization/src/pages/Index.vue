<template>
  <!--class="flex flex-center"-->
  <q-page>
    <div>{{$q.screen.name}}</div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div style="background-color: cornflowerblue;">1</div>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4">
        <div style="background-color: yellowgreen;">2</div>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4">
        <div style="background-color: coral;">3</div>
      </div>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  mounted() {
    this.$i18n.locale = "en-us"
  }
}
</script>

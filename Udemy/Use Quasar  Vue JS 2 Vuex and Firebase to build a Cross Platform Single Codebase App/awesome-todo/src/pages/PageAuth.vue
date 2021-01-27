<template>
  <q-page padding>
    <q-card class="auth-tabs">
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        dense
      >
        <q-tab name="login" label="Login"/>
        <q-tab name="register" label="Register"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <!--Login-->
        <q-tab-panel name="login">
          <LoginRegister :tab="tab"/>
        </q-tab-panel>

        <!--Register-->
        <q-tab-panel name="register">
          <LoginRegister :tab="tab"/>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
  import LoginRegister from "components/Auth/LoginRegister";


  export default {
    name: "PageAuth",
    components: {LoginRegister},
    data() {
      return {
        tab: "login"
      }
    }
  }
</script>

<style scoped>
  .auth-tabs {
    max-width: 500px;
    margin: 0 auto;
  }
</style>

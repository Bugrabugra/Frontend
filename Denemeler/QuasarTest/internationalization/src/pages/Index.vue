<template>
  <q-page class="flex flex-center">
    <q-btn
      :label="$t('failed')"
    >

    </q-btn>
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

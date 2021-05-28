<template>
  <q-btn
    @click="$store.dispatch('setMyLocation')"
    color="green-4"
    :label="$t('pageMainMap.expansionItems.spatialOperations.btnFindMyLocation')"
    class="q-ma-xs"
    style="min-width: 201px;"
    icon="my_location"
  />
</template>

<script>
  export default {
    name: "FindMyLocation",
  }
</script>

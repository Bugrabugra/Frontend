<template>
  <q-table
    v-if="getCurrentContainerLastCollections"
    :data="getCurrentContainerLastCollections"
    :columns="columns"
    row-key="name"
    :rows-per-page-label="$t('pageContainer.weeklyCollections.lblHeader')"
    :rows-per-page-options="[5]"
    :no-data-label="$t('pageContainer.weeklyCollections.lblNoValue')"
    class="q-table--square"
    title-class="title"
    :card-style="{minHeight: getCurrentContainerLastCollections > 0 ? '520px' : '104px'}"
    dense
  />
</template>

<script>
  import {mapGetters} from "vuex";
  import {date} from "quasar";


  export default {
    name: "ContainerCollectionsTable",

    data() {
      return {
        columns: [
          {
            name: 'name',
            required: true,
            label: this.$t("pageContainer.weeklyCollections.lblHeader"),
            align: 'center',
            field: row => row.collectionDate,
            format: val => `${date.formatDate(val, "DD.MM.YYYY - HH:mm")}`,
            sortable: true
          }
        ],
      }
    },

    computed: {
      ...mapGetters([
        "getCurrentContainerLastCollections"
      ])
    }
  }
</script>

<style>
  .container-page .q-table__title.title {
    font-size: 12px;
    font-weight: bold;
  }
</style>

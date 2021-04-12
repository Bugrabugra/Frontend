<template>
  <q-table
    v-if="getCurrentContainerLastCollections"
    title="Bir Haftalık Toplama Tarihleri"
    :data="getCurrentContainerLastCollections"
    :columns="columns"
    row-key="name"
    rows-per-page-label="Gösterilecek kayıt sayısı"
    :rows-per-page-options="[15]"
    no-data-label="Veri bulunamadı"
    class="q-table--square"
    title-class="title"
    :card-style="{minHeight: getCurrentContainerLastCollections > 0 ? '520px' : '90px'}"
    dense
  />
</template>

<script>
  import {format} from "date-fns";
  import {mapGetters} from "vuex";


  export default {
    name: "ContainerCollectionsTable",

    data() {
      return {
        columns: [
          {
            name: 'name',
            required: true,
            label: 'Toplama Tarihleri',
            align: 'center',
            field: row => row.collectionDate,
            format: val => `${format(val, "dd.MM.yyyy - HH:mm")}`,
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

<template>
  <div>
    <q-table
      title="Bir Haftalık Toplama Tarihleri"
      :data="data"
      :columns="columns"
      row-key="name"
      rows-per-page-label="Gösterilecek kayıt sayısı"
      dense
    />

  </div>
</template>

<script>
  import {format} from "date-fns";


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
        data: [
          {
            collectionDate: 1619201237000,
          },
          {
            collectionDate: 1619287118700,
          },
          {
            collectionDate: 1619373926000,
          },
          {
            collectionDate: 1619415087000,
          },
          {
            collectionDate: 1619491389000,
          },
          {
            collectionDate: 1619573841000,
          },
          {
            collectionDate: 1619659272000,
          },
          {
            collectionDate: 1619744704000,
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <v-container>
    <v-data-table
        height="90vh"
        no-data-text="-"
        :headers="headers"
        :items="items"
        :items-per-page="10"
        class="elevation-1"
    >
      <!--<template v-slot:item.durumu="{item}">-->
      <!--  <v-select-->
      <!--      v-bind:items="combo"-->
      <!--  >-->
      <!--  </v-select>-->

      <!--</template>-->
      <template v-slot:item.tarih="{item}">
        {{changeDate(item.tarih)}}
        <!--{{item.tarih}}-->
      </template>
    </v-data-table>
  </v-container>

</template>

<script>
  import dayjs from "dayjs";


  export default {
    name: "Clerk",

    data() {
      return {
        items: [],
        combo: ['Yeni', 'İşlemde', 'Çözüldü', 'İptal'],
        headers: [
          {
            text: "Konu",
            align: "start",
            value: "konu",
          },
          {text: "Açıklama", value: "aciklama"},
          {text: "Türü", value: "turu"},
          {text: "Alanı", value: "alani"},
          {text: "Tarih", value: "tarih"},
          {text: "Durumu", value: "durumu"},
        ]
      }
    },

    methods: {
      getItems() {
        (async () => {
          const res = await fetch("http://localhost:3000/items");
          this.items = await res.json();
        })();
      },

      getSituationColor(situation) {
        if (situation === "Yeni") return 'yellow'
        else if (situation === "İşlemde") return 'orange'
        else if (situation === "Çözüldü") return 'green'
        else if (situation === "İptal") return 'red'
      },

      changeDate(item) {
        return dayjs(item).format("DD-MM-YYYY");
      },

      changeSituation(itemID, situation) {
        (async () => {
          const res = await fetch(`http://localhost:3000/items/${itemID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({situation: situation}),
          });
          const result = await res.json();
          if (result) {
            this.getItems();
          }
        })();
      },
    },

    mounted() {
      this.getItems();
    }
  }
</script>

<style scoped>

</style>
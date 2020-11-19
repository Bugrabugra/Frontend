<template>
  <v-container>
    <!--Arama barı-->
    <v-text-field
        height="60px"
        background-color="cyan darken-1"
        v-model="search"
        append-icon="mdi-magnify"
        label="Arama"
        single-line
        hide-details
    ></v-text-field>
    <v-spacer></v-spacer>

    <v-data-table
        height="80vh"
        no-data-text="-"
        dense
        :search="search"
        :headers="headers"
        :items="items"
        :items-per-page="20"
        class="elevation-1"
    >
      <template v-slot:item.guncelleme="props">
        <v-edit-dialog
            :return-value.sync="props.item.guncelleme"
            large
            @save="update(props.item.id, newSituation, newDescription)"
        >
          <v-btn>Güncelleme</v-btn>
          <div>{{ props.item.guncelleme }}</div>
          <template v-slot:input>
            <div class="mt-4 title">
              Güncelleme
            </div>
            <v-textarea
                v-model="newDescription"
                label="Kurum açıklaması"
                counter
            ></v-textarea>
            <v-select
                label="Yeni durum"
                style="width: 115px;"
                v-bind:items="combo"
                v-model="newSituation"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>

      <!--State description-->
      <template v-slot:item.kurum_aciklama="{item}">
        <v-textarea
            color="black"
            style="width: 200px;"
            v-bind:value="item.kurum_aciklama"
        >
          {{item.kurum_aciklama}}
        </v-textarea>
      </template>

      <!--Dates-->
      <template v-slot:item.tarih="{item}">
        {{changeDate(item.tarih)}}
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
        search: "",
        newSituation: "",
        newDescription: "",
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
          {text: "Kurum Açıklama", value: "kurum_aciklama"},
          {text: "Güncelleme", value: "guncelleme"},
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

      update(itemID, situation, stateDescription) {
        (async () => {
          const res = await fetch(`http://localhost:3000/items/${itemID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({situation: situation, stateDescription: stateDescription}),
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
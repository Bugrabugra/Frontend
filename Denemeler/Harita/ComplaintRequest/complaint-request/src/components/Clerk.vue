<template>
  <v-container style="background-color: #95d3ec;" class="pa-0">
    <Navbar></Navbar>
    <!--Arama barı-->
    <v-text-field
        hide-details
        style="font-size: 30px; font-weight: bolder;"
        height="60px"
        filled
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        placeholder="Arama"
        single-line
    ></v-text-field>

    <v-data-table
        :footer-props="{itemsPerPageText: 'Sayfada gösterilecek satır sayısı'}"
        fixed-header
        dark
        no-data-text="-"
        dense
        :search="search"
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="elevation-1"
    >
      <!--Update-->
      <template v-slot:item.guncelleme="props">
        <v-edit-dialog
            :return-value.sync="props.item.guncelleme"
            save-text="Güncelle"
            cancel-text="İptal"
            large
            @save="update(props.item.id, props.item.durumu, props.item.kurum_aciklama)"
            @cancel="getItems"
        >
          <!--Update button-->
          <v-btn
              color="blue"
              small
          >Güncelleme
          </v-btn>

          <div>{{props.item.guncelleme}}</div>

          <template v-slot:input>
            <div class="mt-4 title">
              Güncelleme
            </div>
            <v-textarea
                v-model="props.item.kurum_aciklama"
                label="Kurum açıklaması"
                counter
            ></v-textarea>
            <v-select
                label="Yeni durum"
                style="width: 100%;"
                v-bind:items="combo"
                v-model="props.item.durumu"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>

      <!--Topic-->
      <template v-slot:item.konu="{item}">
        <v-textarea
            rows="3"
            readonly
            v-if="item.konu"
            color="black"
            style="width: 90%;"
            v-bind:value="item.konu"
        >
        </v-textarea>
      </template>

      <!--Description-->
      <template v-slot:item.aciklama="{item}">
        <v-textarea
            rows="3"
            readonly
            v-if="item.aciklama"
            color="black"
            style="width: 100%;"
            v-bind:value="item.aciklama"
        >
        </v-textarea>
      </template>

      <!--State description-->
      <template v-slot:item.kurum_aciklama="{item}">
        <v-textarea
            rows="3"
            readonly
            v-if="item.kurum_aciklama"
            color="black"
            style="width: 100%;"
            v-bind:value="item.kurum_aciklama"
        >
        </v-textarea>
      </template>

      <!--Dates-->
      <template v-slot:item.tarih="{item}">
        {{changeDate(item.tarih)}}
      </template>

      <!--Situation-->
      <template v-slot:item.durumu="{item}">
        <v-chip
            text-color="black"
            v-bind:color="getSituationColor(item.durumu)">
          {{item.durumu}}
        </v-chip>
      </template>

    </v-data-table>
  </v-container>

</template>

<script>
  import dayjs from "dayjs";
  import Navbar from "./Navbar";


  export default {
    name: "Clerk",
    components: {Navbar},
    data() {
      return {
        items: [],
        search: "",
        combo: ['Yeni', 'İşlemde', 'Çözüldü', 'İptal'],
        headers: [
          {text: "Konu", align: "start", value: "konu"},
          {text: "İlçesi", value: "ilce"},
          {text: "Mahallesi", value: "mahalle"},
          {text: "Sokağı", value: "sokak"},
          {text: "Kapısı", value: "kapi"},
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
        if (situation === "Yeni") return '#f6c908'
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
            console.log(result);
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
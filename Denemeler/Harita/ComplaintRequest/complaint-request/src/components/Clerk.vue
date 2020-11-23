<template>
  <v-container style="background-color: #95d3ec;" class="pa-0 elevation-20">
    <Navbar></Navbar>
    <div id="map" ref="map" style="height: 40vh;"></div>

    <!--Arama barı-->
    <v-text-field
        hide-details
        style="font-size: 30px; font-weight: bolder; border: 2px solid black;"
        height="60px"
        filled
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        placeholder="Arama"
        single-line
    ></v-text-field>

    <v-data-table
        @click:row="zoomToItem"
        :footer-props="{itemsPerPageText: 'Sayfada gösterilecek satır sayısı'}"
        fixed-header
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
              color="blue lighten-3"
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
            style="width: 90%; font-size: 15px;"
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
            style="width: 100%; font-size: 15px;"
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
        map: null,
        search: "",
        combo: ['Yeni', 'İşlemde', 'Çözüldü', 'İptal'],
        headers: [
          {text: "Konu", align: "start", value: "konu"},
          {text: "İlçe", value: "ilce"},
          {text: "Mahalle", value: "mahalle"},
          {text: "Sokak", value: "sokak"},
          {text: "Kapı", value: "kapi"},
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
      initMap() {
        setTimeout(() => {
          this.map = new window.google.maps.Map(this.$refs["map"], {
            center: {lat: 40.984220, lng: 29.132068},
            zoom: 16
          })

          const _this = this;
          const eqfeed_callback = function (results) {
            for (let i = 0; i < results.length; i++) {
              if (results[i].durumu === "Yeni" || results[i].durumu === "İşlemde") {
                let coords = "";
                if (results[i].latlong) {
                  coords = results[i].latlong.split(",");
                }
                const latLng = new window.google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
                let marker;
                let url = "";
                if (results[i].alani === "Asfalt çalışması") {
                  url = "https://drive.google.com/uc?export=download&id=1LLggWYfEL7rhNJyfJcXW1ltWfIpVkzLS"
                } else if (results[i].alani === "Çöp & Temizlik") {
                  url = "https://drive.google.com/uc?export=download&id=1G9QP3i3yOClqGoDKmviEoXSUW05wichs"
                } else if (results[i].alani === "Onarım") {
                  url = "https://drive.google.com/uc?export=download&id=13DDUL2w7qxHf2v2kE_r0spOFkD4vBdxW"
                } else if (results[i].alani === "Park ekipmanları") {
                  url = "https://drive.google.com/uc?export=download&id=1fmGRlFx_tvDOGc1LrYHPyRTnL9bQmK1g"
                } else if (results[i].alani === "Sağlıksız işyeri") {
                  url = "https://drive.google.com/uc?export=download&id=1iel0ZRjnP9ZL5QVCYQSJ36Pct3FABh3O"
                } else if (results[i].alani === "Sokak hayvanları") {
                  url = "https://drive.google.com/uc?export=download&id=1jEoOhXHL4lLfsBSdSL6nYCrxnhUPbG0F"
                } else if (results[i].alani === "Yardıma muhtaç insanlar") {
                  url = "https://drive.google.com/uc?export=download&id=1sZHhE2y9iOlAVZNxczW6cAQoFf3OiTp-"
                }
                marker = new window.google.maps.Marker({
                  position: latLng,
                  map: _this.map,
                  animation: window.google.maps.Animation.DROP,
                  icon: {
                    url: url
                  },
                  title: `${results[i].konu}`
                })

                const contentString =
                  `
                  <h3>${results[i].konu}</h3>
                  <p><h4>İlçe: </h4>${results[i].ilce}</p>
                  <p><h4>Mahalle: </h4>${results[i].mahalle}</p>
                  <p><h4>Sokak: </h4>${results[i].sokak}</p>
                  <p><h4>Kapı: </h4>${results[i].kapi}</p>
                  <p><h4>Açıklama: </h4>${results[i].aciklama}</p>
                  <p><h4>Türü: </h4>${results[i].turu}</p>
                  <p><h4>Alanı: </h4>${results[i].alani}</p>
                  <p><h4>Tarih: </h4>${_this.changeDate(results[i].tarih)}</p>
                  <p><h4>Durumu: </h4>${results[i].durumu}</p>
                  `;

                const infoWindow = new window.google.maps.InfoWindow({
                  content: contentString,
                });

                marker.addListener("click", () => {
                  infoWindow.open(_this.map, marker)
                })
              }
            }
          };

          eqfeed_callback(this.items);
        }, 1000)
      },

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

      zoomToItem(e) {
        const coords = e.latlong.split(",");
        const latLng = new window.google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
        this.map.setZoom(17);
        this.map.panTo(latLng);
      }
    },

    mounted() {
      this.getItems();
      this.initMap();
    }
  }
</script>

<style scoped>

</style>
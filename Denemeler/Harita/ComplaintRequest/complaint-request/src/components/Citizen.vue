<template>
  <div id="app">
    <div id="map" ref="map" style="height: 600px"></div>
    <v-app>
      <v-card>
        <v-tabs
            v-model="tab"
            color="white darken-2"
            centered
            grow
            icons-and-text
            slider-size="3"
        >
          <v-tabs-slider color="black"></v-tabs-slider>

          <v-tab href="#tab-1" style="background-color: #00bfff">
            Yeni İstek & Şikayet
            <v-icon>mdi-frequently-asked-questions</v-icon>
          </v-tab>

          <v-tab href="#tab-2" style="background-color: #ff8e03">
            Önceki İstek & Şikayetlerim
            <v-icon>mdi-archive</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item value="tab-1">
            <v-card flat color="blue lighten-5">
              <v-card-text>
                <v-form v-model="valid" style="background-color: white">
                  <v-container>
                    <v-row>

                      <!--Kullanıcı-->
                      <v-col cols="12" md="12">
                        <v-text-field
                            v-bind:value="`${this.$route.params.adsoyad}`"
                            readonly
                            prepend-icon="mdi-account-outline"
                            label="Oluşturan"
                        ></v-text-field>
                      </v-col>

                      <!--Koordinatlar-->
                      <v-col cols="12" md="12">
                        <v-text-field
                            v-bind:value="`Enlem: ${cCoordinates.lat ? cCoordinates.lat : '-'} - Boylam: ${cCoordinates.lng ? cCoordinates.lng : '-'}`"
                            readonly
                            prepend-icon="mdi-map-marker-outline"
                            :rules="[rules.required]"
                            label="Koordinatlar"
                            required
                        ></v-text-field>
                      </v-col>

                      <!--Başlık-->
                      <v-col cols="12" md="12">
                        <v-text-field
                            prepend-icon="mdi-text-short"
                            v-model="topic"
                            :rules="[rules.counterTopic, rules.required]"
                            :counter="100"
                            label="Konusu"
                            required
                        ></v-text-field>
                      </v-col>

                      <!--Açıklama-->
                      <v-col cols="12" md="12">
                        <v-textarea
                            prepend-icon="mdi-text-subject"
                            v-model="description"
                            :rules="[rules.counterDescription, rules.required]"
                            :counter="200"
                            label="Açıklama"
                            required
                        ></v-textarea>
                      </v-col>

                      <!--Tür-->
                      <v-col cols="12" md="12">
                        <v-select
                            prepend-icon="mdi-comment-question-outline"
                            v-model="selected"
                            v-bind:items="selectItems"
                            :rules="[rules.required]"
                            label="Türü"
                            required
                        ></v-select>
                      </v-col>

                      <!--Fotoğraf-->
                      <v-col cols="12" md="12">
                        <v-file-input
                            prepend-icon="mdi-camera-outline"
                            accept="image/*"
                            hint="Lütfen 2mb'tan büyük resim eklemeyiniz"
                            persistent-hint
                            clearable
                            label="Fotoğraf"
                            show-size
                            small-chips
                            truncate-length="15"
                        ></v-file-input>
                      </v-col>

                      <!--Tarih-->
                      <v-col cols="12" md="12">
                        <v-menu
                            v-bind:close-on-content-click="true"
                            nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                label="Tarih"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                              v-model="date"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>

                    <!--Düğme-->
                    <v-btn v-if="valid" v-on:click="submit" color="green">Kaydet</v-btn>

                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-2">
            <v-card flat color="orange lighten-5">
              <v-card-text>
                <v-data-table
                    no-data-text="-"
                    :headers="headers"
                    :items="cArchivedItems"
                    :items-per-page="10"
                    class="elevation-1"
                >
                  <template v-slot:item.durumu="{item}">
                    <v-chip text-color="black" v-bind:color="getSituationColor(item.durumu)">
                      {{ item.durumu }}
                    </v-chip>
                  </template>
                  <template v-slot:item.tarih="{item}">
                    {{changeDate(item.tarih)}}
                    <!--{{item.tarih}}-->
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

    </v-app>


  </div>
</template>

<script>
  import dayjs from "dayjs";


  export default {
    name: "Citizen",
    data() {
      return {
        map: null,
        tab: null,
        coordinates: {lat: null, lng: null},
        valid: false,
        topic: "",
        description: "",
        selected: "",
        selectItems: ["İstek", "Şikayet"],
        date: null,
        rules: {
          required: value => !!value || 'Bu alan zorunludur.',
          counterTopic: value => value.length <= 100 || 'En fazla 100 karakter girebilirsiniz',
          counterDescription: value => value.length <= 200 || 'En fazla 200 karakter girebilirsiniz',
        },
        archivedItems: [],
        headers: [
          {
            text: 'Konu',
            align: 'start',
            sortable: false,
            value: 'konu',
          },
          {text: 'Açıklama', value: 'aciklama'},
          {text: 'Türü', value: 'turu'},
          {text: 'Tarih', value: "tarih"},
          {text: 'Durumu', value: 'durumu'},
        ],
      }
    },

    computed: {
      cCoordinates() {
        return this.coordinates;
      },

      cArchivedItems() {
        return this.archivedItems;
      },

      cDate() {
        return dayjs(this.date).format("DD-MM-YYYY");
      }
    },

    methods: {
      submit() {
        if (this.valid) {
          (async () => {
            const res = await fetch("http://localhost:3000/citizen/new", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                topic: this.topic,
                description: this.description,
                type: this.selected,
                date: this.cDate,
                coordinates: [this.cCoordinates.lat, this.cCoordinates.lng],
                id_user: this.$route.params.id
              }),
            })
            const result = await res.json();
            console.log(result);
          })();
        }
      },

      initMap() {
        setTimeout(() => {
          this.map = new window.google.maps.Map(this.$refs["map"], {
            center: {lat: 40.984220, lng: 29.132068},
            zoom: 16
          })

          this.map.addListener('click', (e) => {
            if (e) {
              this.coordinates.lat = e.latLng.lat();
              this.coordinates.lng = e.latLng.lng();
            }
          });
        }, 500)
      },

      getOldItems() {
        (async () => {
          const userID = this.$route.params.id;
          const res = await fetch(`http://localhost:3000/citizen/${userID}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
          const result = await res.json();
          this.archivedItems = result.rows;
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
      }
    },

    mounted() {
      this.initMap();
      this.getOldItems();
    }
  }
</script>

<style scoped>

</style>
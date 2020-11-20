<template>
  <v-container class="pa-0">
    <Navbar></Navbar>
    <v-row class="ma-0">
      <v-col class="pa-0">
        <div id="map" ref="map" style="height: 40vh;"></div>
        <v-container style="padding: 0;">
          <v-card class="pa-0">
            <v-tabs
                v-model="tab"
                color="white darken-2"
                centered
                grow
                icons-and-text
                slider-size="8"
            >
              <v-tabs-slider color="pink accent-2"></v-tabs-slider>

              <v-tab href="#tab-1" style="background-color: #00bfff;">
                Yeni İstek & Şikayet
                <v-icon>mdi-frequently-asked-questions</v-icon>
              </v-tab>

              <v-tab href="#tab-2" style="background-color: #ff8e03" v-on:click="getOldItems">
                Önceki İstek & Şikayetlerim
                <v-icon>mdi-archive</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item value="tab-1">
                <v-card flat>
                  <v-card-text class="pa-2">
                    <v-form v-model="valid">
                      <v-container>
                        <v-row>

                          <!--User-->
                          <v-col cols="4" md="2">
                            <v-text-field
                                v-bind:value="`${this.$route.params.adsoyad}`"
                                readonly
                                prepend-icon="mdi-account-outline"
                                label="Oluşturan"
                            ></v-text-field>
                          </v-col>

                          <!--Coordinates-->
                          <v-col cols="4" md="2">
                            <v-text-field
                                v-bind:value="`Enlem: ${cCoordinates.lat ? cCoordinates.lat : '-'} - Boylam: ${cCoordinates.lng ? cCoordinates.lng : '-'}`"
                                readonly
                                prepend-icon="mdi-map-marker-outline"
                                :rules="[rules.required]"
                                label="Koordinatlar"
                                required
                            ></v-text-field>
                          </v-col>

                          <!--District-->
                          <v-col cols="4" md="2">
                            <v-text-field
                                v-bind:value="cDistrict"
                                prepend-icon="mdi-alpha-i-circle-outline"
                                label="İlçe"
                            ></v-text-field>
                          </v-col>

                          <!--Neighborhood-->
                          <v-col cols="4" md="2">
                            <v-text-field
                                v-bind:value="cNeighborhood"
                                prepend-icon="mdi-alpha-m-circle-outline"
                                label="Mahalle"
                            ></v-text-field>
                          </v-col>

                          <!--Street-->
                          <v-col cols="4" md="2">
                            <v-text-field
                                v-bind:value="cStreet"
                                prepend-icon="mdi-alpha-s-circle-outline"
                                label="Sokak"
                            ></v-text-field>
                          </v-col>

                          <!--Door-->
                          <v-col cols="4" md="2">
                            <v-text-field
                                v-bind:value="cDoor"
                                prepend-icon="mdi-alpha-k-circle-outline"
                                label="Kapı"
                            ></v-text-field>
                          </v-col>

                          <!--Topic-->
                          <v-col cols="4" md="4" sm="6">
                            <v-text-field
                                prepend-icon="mdi-text-short"
                                v-model="topic"
                                :rules="[rules.counterTopic, rules.required]"
                                :counter="100"
                                label="Konusu"
                                required
                            ></v-text-field>
                          </v-col>

                          <!--Type-->
                          <v-col cols="4" md="2" sm="6">
                            <v-select
                                prepend-icon="mdi-comment-question-outline"
                                v-model="selectedType"
                                v-bind:items="selectTypeItems"
                                :rules="[rules.required]"
                                label="Türü"
                                required
                            ></v-select>
                          </v-col>

                          <!--Branch-->
                          <v-col cols="4" md="2">
                            <v-select
                                prepend-icon="mdi-format-list-bulleted-type"
                                v-model="selectedBranch"
                                v-bind:items="selectBranchItems"
                                :rules="[rules.required]"
                                label="Sorun çeşidi"
                                required
                            ></v-select>
                          </v-col>

                          <!--Image-->
                          <v-col cols="4" md="2">
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

                          <!--Date-->
                          <v-col cols="4" md="2">
                            <v-menu
                                v-bind:close-on-content-click="true"
                                nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-bind:rules="[rules.required]"
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

                          <!--Description-->
                          <v-col cols="6" md="6">
                            <v-textarea
                                prepend-icon="mdi-text-subject"
                                v-model="description"
                                :rules="[rules.counterDescription, rules.required]"
                                :counter="200"
                                label="Açıklama"
                                required
                            ></v-textarea>
                          </v-col>

                        </v-row>

                        <!--Save button-->
                        <v-btn
                            v-if="valid"
                            v-on:click="submit"
                            color="green"
                            v-bind:disabled="submitted"
                        >
                          Kaydet<v-icon v-if="submitted">mdi-check-bold</v-icon>
                        </v-btn>

                        <!--New button-->
                        <v-btn
                            class="ml-2"
                            v-if="submitted"
                            v-on:click="emptyFields"
                            color="blue"
                        >
                          Yeni<v-icon>mdi-autorenew</v-icon>
                        </v-btn>

                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item value="tab-2">
                <v-card flat>
                  <v-card-text class="pa-2">
                    <v-data-table
                        :footer-props="{itemsPerPageText: 'Sayfada gösterilecek satır sayısı'}"
                        fixed-header
                        dense
                        height="35vh"
                        no-data-text="-"
                        :headers="headers"
                        :items="cArchivedItems"
                        :items-per-page="10"
                        class="elevation-1"
                    >
                      <!--Situation-->
                      <template v-slot:item.durumu="{item}">
                        <v-chip text-color="black" v-bind:color="getSituationColor(item.durumu)">
                          {{item.durumu}}
                        </v-chip>
                      </template>

                      <!--Date-->
                      <template v-slot:item.tarih="{item}">
                        {{changeDate(item.tarih)}}
                      </template>

                      <!--Description-->
                      <template v-slot:item.aciklama="{item}">
                        <v-textarea
                            readonly
                            rows="3"
                            v-if="item.aciklama"
                            color="black"
                            style="width: 100%; font-size: 15px;"
                            :value="item.aciklama"
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
                            style="width: 100%; font-size: 15px;"
                            v-bind:value="item.kurum_aciklama"
                        >
                          {{item.kurum_aciklama}}
                        </v-textarea>
                      </template>

                      <!--Topic-->
                      <template v-slot:item.konu="{item}">
                        <v-textarea
                            rows="3"
                            readonly
                            v-if="item.konu"
                            color="black"
                            style="width: 100%; font-size: 15px;"
                            v-bind:value="item.konu"
                        >
                        </v-textarea>
                      </template>

                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import dayjs from "dayjs";
  import Navbar from "./Navbar";


  export default {
    name: "Citizen",
    components: {Navbar},
    data() {
      return {
        map: null,
        tab: null,
        coordinates: {lat: null, lng: null},
        district: "",
        neighborhood: "",
        street: "",
        door: "",
        valid: false,
        topic: "",
        description: "",
        selectedType: "",
        selectTypeItems: ["İstek", "Şikayet"],
        selectedBranch: "",
        selectBranchItems: [
          "Asfalt çalışması",
          "Çöp & Temizlik",
          "Onarım",
          "Park ekipmanları",
          "Sağlıksız işyeri",
          "Sokak hayvanları",
          "Yardıma muhtaç insanlar",
        ],
        submitted: false,
        date: null,
        rules: {
          required: value => !!value || 'Bu alan zorunludur.',
          counterTopic: value => value.length <= 100 || 'En fazla 100 karakter girebilirsiniz',
          counterDescription: value => value.length <= 200 || 'En fazla 200 karakter girebilirsiniz',
        },
        archivedItems: [],
        headers: [
          {
            text: "Konu",
            align: "start",
            sortable: false,
            value: "konu",
          },
          // {text: "İlçesi", value: "ilce"},
          // {text: "Mahallesi", value: "mahalle"},
          // {text: "Sokağı", value: "sokak"},
          // {text: "Kapısı", value: "kapi"},
          {text: "Açıklama", value: "aciklama"},
          {text: "Türü", value: "turu"},
          {text: "Alanı", value: "alani"},
          {text: "Tarih", value: "tarih"},
          {text: "Durumu", value: "durumu"},
          {text: "Kurum Açıklama", value: "kurum_aciklama"}
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
      },

      cDoor() {
        return this.door;
      },

      cStreet() {
        return this.street;
      },

      cNeighborhood() {
        return this.neighborhood;
      },

      cDistrict() {
        return this.district;
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
                district: this.district,
                neighborhood: this.neighborhood,
                street: this.street,
                door: this.door,
                topic: this.topic,
                description: this.description,
                type: this.selectedType,
                branch: this.selectedBranch,
                date: this.cDate,
                coordinates: [this.cCoordinates.lat, this.cCoordinates.lng],
                id_user: this.$route.params.id
              }),
            })
            if (res.status === 200) {
              this.submitted = true;
              const result = await res.json();
              console.log(result);
            }
          })();
        }
      },

      initMap() {
        let geocoder;
        setTimeout(() => {
          geocoder = new window.google.maps.Geocoder();
          this.map = new window.google.maps.Map(this.$refs["map"], {
            center: {lat: 40.984220, lng: 29.132068},
            zoom: 16
          })

          this.map.addListener('click', (e) => {
            if (e) {
              this.coordinates.lat = e.latLng.lat();
              this.coordinates.lng = e.latLng.lng();

              (async () => {
                await geocoder.geocode({location: this.coordinates}, (results, status) => {
                  if (status === "OK") {
                    console.log(results);
                    this.addressLookup(results);
                  } else {
                    window.alert("Geocoder failed due to: " + status);
                  }
                });
              })();
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
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          })
          const result = await res.json();
          this.archivedItems = result.rows;
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

      emptyFields() {
        this.coordinates = {lat: null, lng: null};
        this.district = "";
        this.neighborhood = "";
        this.street = "";
        this.door = "";
        this.valid = false;
        this.topic = "";
        this.description = "";
        this.selectedType = "";
        this.selectedBranch = "";
        this.submitted = false;
        this.date = null;
      },

      addressLookup(addressArray) {
        addressArray[0].address_components.forEach(addressComponent => {
          if (addressComponent["types"].includes("street_number")) {
            addressComponent.long_name ? this.door = addressComponent.long_name : this.door = "-";
          } else if (addressComponent["types"].includes("route")) {
            addressComponent.long_name ? this.street = addressComponent.long_name : this.street = "-";
          } else if (addressComponent["types"].includes("administrative_area_level_4")) {
            addressComponent.long_name ? this.neighborhood = addressComponent.long_name : this.neighborhood = "-";
          } else if (addressComponent["types"].includes("administrative_area_level_2")) {
            addressComponent.long_name ? this.district = addressComponent.long_name : this.district = "-";
          }
        })
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
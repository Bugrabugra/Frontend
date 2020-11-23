<template>
  <v-container class="pa-0 elevation-20">
    <Navbar></Navbar>
    <v-container>
      <div class="container-fluid">
        <div class="row">
          <!--Toplam İstek Şikayetler-->
          <div class="col-sm-4">
            <QueryBuilder :cubejs-api="cubejsApi" :query="queryTotal" style="width: 100%">
              <template v-slot="{resultSet}">
                <v-card color="blue" elevation="6">
                  <v-card-title class="justify-center">Toplam İstek & Şikayetler</v-card-title>
                  <v-card-text class="text-center text-h1 text-h1" style="font-size: 30px; font-weight: bolder;">
                    {{resultSet.loadResponse.results[0].data[0]["IstekSikayetler.count"]}}
                  </v-card-text>
                </v-card>
              </template>
            </QueryBuilder>
          </div>

          <!--Toplam İstek-->
          <div class="col-sm-4">
            <QueryBuilder :cubejs-api="cubejsApi" :query="queryComplaint" style="width: 100%">
              <template v-slot="{resultSet}">
                <v-card color="blue lighten-4" elevation="6">
                  <v-card-title class="justify-center">Şikayetler</v-card-title>
                  <v-card-text class="text-center text-h1" style="font-size: 30px; font-weight: bolder; margin: 0 auto;">
                    {{resultSet.loadResponse.results[0].data[0]["IstekSikayetler.count"]}}
                  </v-card-text>
                </v-card>
              </template>
            </QueryBuilder>
          </div>

          <!--Toplam Şikayet-->
          <div class="col-sm-4">
            <QueryBuilder :cubejs-api="cubejsApi" :query="queryRequest" style="width: 100%">
              <template v-slot="{resultSet}">
                <v-card color="blue lighten-4" elevation="6">
                  <v-card-title class="justify-center">İstekler</v-card-title>
                  <v-card-text class="text-center text-h1" style="font-size: 30px; font-weight: bolder; margin: 0 auto;">
                    {{resultSet.loadResponse.results[0].data[0]["IstekSikayetler.count"]}}
                  </v-card-text>
                </v-card>
              </template>
            </QueryBuilder>
          </div>
        </div>

        <br>

        <div class="row">
          <div class="col-sm-6">
            <!--Çözümlenmiş-->
            <QueryBuilder :cubejs-api="cubejsApi" :query="querySolved" style="width: 100%">
              <template v-slot="{resultSet}">
                <v-card color="green" elevation="6">
                  <v-card-title class="justify-center">Çözümlenmiş & İptal</v-card-title>
                  <v-card-text class="text-center text-h1" style="font-size: 30px; font-weight: bolder; margin: 0 auto;">
                    {{resultSet.loadResponse.results[0].data[0]["IstekSikayetler.count"]}}
                  </v-card-text>
                </v-card>
              </template>
            </QueryBuilder>
          </div>

          <div class="col-sm-6">
            <!--Çözümlenmemiş-->
            <QueryBuilder :cubejs-api="cubejsApi" :query="queryNotSolved" style="width: 100%">
              <template v-slot="{resultSet}">
                <v-card color="orange" elevation="6">
                  <v-card-title class="justify-center">Yeni & İşlemde</v-card-title>
                  <v-card-text class="text-center text-h1" style="font-size: 30px; font-weight: bolder; margin: 0 auto;">
                    {{resultSet.loadResponse.results[0].data[0]["IstekSikayetler.count"]}}
                  </v-card-text>
                </v-card>
              </template>
            </QueryBuilder>
          </div>
        </div>

        <br>

        <div class="row">
          <div class="col-sm-6">
            <!--Türlerine göre-->
            <QueryBuilder :cubejs-api="cubejsApi" :query="queryCountBranch" style="width: 100%">
              <template v-slot="{resultSet}">
                <v-card color="brown lighten-2" elevation="6">
                  <v-card-title class="justify-center">Şikayet Türlerine Göre İstek & Şikayet Sayıları</v-card-title>
                  <v-card-text>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                        <tr>
                          <th class="text-left text-h5">
                            Şikayet Türü
                          </th>
                          <th class="text-left text-h5">
                            Toplam Sayısı
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            class="text-h5"
                            v-for="item in resultSet.loadResponse.results[0].data"
                            :key="item['IstekSikayetler.alani']"
                        >
                          <td>{{ item["IstekSikayetler.alani"] }}</td>
                          <td>{{ item["IstekSikayetler.count"] }}</td>
                        </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </template>
            </QueryBuilder>
          </div>

          <div class="col-sm-6">
            <!--İlçelerine göre-->
            <QueryBuilder :cubejs-api="cubejsApi" :query="queryCountDistrict" style="width: 100%">
              <template v-slot="{resultSet}">
                <v-card color="purple lighten-2" elevation="6">
                  <v-card-title class="justify-center">İlçelerine Göre İstek & Şikayet Sayıları</v-card-title>
                  <v-card-text>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                        <tr>
                          <th class="text-left text-h5">
                            İlçe
                          </th>
                          <th class="text-left text-h5">
                            Toplam Sayısı
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            class="text-h5"
                            v-for="item in resultSet.loadResponse.results[0].data"
                            :key="item['IstekSikayetler.ilce']"
                        >
                          <td>{{item["IstekSikayetler.ilce"]}}</td>
                          <td>{{item["IstekSikayetler.count"]}}</td>
                        </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </template>
            </QueryBuilder>
          </div>
        </div>
      </div>
    </v-container>

  </v-container>
</template>

<script>
  import Navbar from "./Navbar";
  import cubejs from "@cubejs-client/core";
  import {QueryBuilder} from "@cubejs-client/vue";

  const cubejsApi = cubejs(
    '5a230b453f6b71a9d81dbe94371180cbc5ec6453fbbbac4fe7b547cf51182b48d593d4059b7fb63275c21f7be66cda982d5bdd2adf318b91e6b29587a7232543',
    { apiUrl: 'http://localhost:4000/cubejs-api/v1' },
  );


  export default {
    name: "Admin",

    components: {Navbar, QueryBuilder},

    data() {
      const queryTotal = {
        measures: [
          "IstekSikayetler.count"
        ],
        renewQuery: false
      };

      const queryRequest = {
        measures: [
          "IstekSikayetler.count"
        ],
        filters: [{
          member: "IstekSikayetler.turu",
          operator: "equals",
          values: ["İstek"]
        }],
        renewQuery: false
      };

      const queryComplaint = {
        measures: [
          "IstekSikayetler.count"
        ],
        filters: [{
          member: "IstekSikayetler.turu",
          operator: "equals",
          values: ["Şikayet"]
        }],
        renewQuery: false
      };

      const querySolved = {
        measures: [
          "IstekSikayetler.count"
        ],
        filters: [{
          member: "IstekSikayetler.durumu",
          operator: "contains",
          values: ["İptal", "Çözüldü"]
        }],
        renewQuery: false
      };

      const queryNotSolved = {
        measures: [
          "IstekSikayetler.count"
        ],
        filters: [{
          member: "IstekSikayetler.durumu",
          operator: "contains",
          values: ["Yeni", "İşlemde"]
        }],
        renewQuery: false
      };

      const queryCountBranch = {
        measures: [
          "IstekSikayetler.count"
        ],
        filters: [{
          member: "IstekSikayetler.alani",
          operator: "contains",
          values: [
            "Asfalt çalışması",
            "Çöp & Temizlik",
            "Onarım",
            "Park ekipmanları",
            "Sağlıksız işyeri",
            "Sokak hayvanları",
            "Yardıma muhtaç insanlar"
          ]
        }],
        dimensions: ["IstekSikayetler.alani"],
        renewQuery: false
      };

      const queryCountDistrict = {
        measures: [
          "IstekSikayetler.count"
        ],
        filters: [{
          member: "IstekSikayetler.ilce",
          operator: "contains",
          values: [
            "Ataşehir",
            "Maltepe",
            "Üsküdar"
          ]
        }],
        dimensions: ["IstekSikayetler.ilce"],
        renewQuery: false
      };

      return {
        cubejsApi,
        queryTotal,
        queryRequest,
        queryComplaint,
        querySolved,
        queryNotSolved,
        queryCountBranch,
        queryCountDistrict,
      }
    },

    methods: {
      renew() {
        const _this = this;
        setInterval(() => {
          _this.queryTotal.renewQuery = true;
          _this.queryTotal.renewQuery = false;
          _this.queryRequest.renewQuery = true;
          _this.queryRequest.renewQuery = false;
          _this.queryComplaint.renewQuery = true;
          _this.queryComplaint.renewQuery = false;
          _this.querySolved.renewQuery = true;
          _this.querySolved.renewQuery = false;
          _this.queryNotSolved.renewQuery = true;
          _this.queryNotSolved.renewQuery = false;
          _this.queryCountBranch.renewQuery = true;
          _this.queryCountBranch.renewQuery = false;
          _this.queryCountDistrict.renewQuery = true;
          _this.queryCountDistrict.renewQuery = false;

        }, 5000)
      }
    },

    mounted() {
      this.renew();
    }
  }
</script>

<style scoped>

</style>
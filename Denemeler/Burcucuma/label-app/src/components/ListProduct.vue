<template>
  <v-container style="margin: auto 0;">
    <v-row justify="center" align="center">
      <v-col cols="10">
        <v-card
            elevation="10"
            class="mx-auto"
            tile
            dark
        >
          <v-card-title style="background-color: #393737; color: white">Ürünler ve Etiket Durumları</v-card-title>

          <v-text-field
              class="ml-3 mt-2 mb-0 pb-0"
              style="max-width: 50%"
              label="Ürün Adı Ara"
              v-model="search"
              outlined
              hide-details
          />

          <v-list shaped style="max-height: 500px; overflow-y: auto">

            <v-list-item
                v-for="(product, i) in filterProducts"
                :key="i"
            >
              <v-container>
                <v-row>
                  <v-list-item-content>
                    <v-list-item-title style="color: deepskyblue; font-size: large;">{{product.name}}</v-list-item-title>
                  </v-list-item-content>
                </v-row>

                <v-row>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="5">
                        <v-text-field
                            label="Mevcut durumu"
                            v-model="product.situation"
                        />
                      </v-col>

                      <v-col cols="7">
                        <v-select
                            label="Durumunu değiştir"
                            :items="filteredSituations"
                            item-text="name"
                            @change="setSituation(product, $event)"
                        />
                      </v-col>

                    </v-row>
                  </v-container>
                </v-row>
              </v-container>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
  import {db, auth} from "../firebase/config"


  export default {
    name: "ListProduct",

    data() {
      return {
        products: [],
        situations: [],
        select: "",
        search: ""
      }
    },

    computed: {
      filterProducts() {
        return this.products.filter(product => {
          return product.name.toLowerCase().includes(this.search.toLowerCase());
        })
      },

      currentUser() {
        return auth.currentUser.email;
      },

      filteredSituations() {
        return this.situations.filter(situation => {
          return situation.users.includes(this.currentUser);
        })
      }
    },

    methods: {
      getProducts() {
        db.collection("products").onSnapshot(res => {
          const changes = res.docChanges();
          changes.forEach(change => {
            if (change.type === "added") {
              this.products.push({
                ...change.doc.data(),
                id: change.doc.id
              })
            }
          })
        })
        this.$store.dispatch("setProducts", this.products);
      },

      getSituations() {
        db.collection("situations").onSnapshot(res => {
          const changes = res.docChanges();
          changes.forEach(change => {
            if (change.type === "added") {
              this.situations.push({
                ...change.doc.data(),
                id: change.doc.id
              })
            }
          })
        })
        this.$store.dispatch("setSituations", this.situations);
      },

      setSituation(product, value) {
        db
          .collection("products")
          .doc(product.id)
          .update({
            situation: value
          })
          .then(() => {});
      }
    },

    mounted() {
      console.log(this.currentUser)
      this.getProducts();
      this.getSituations();
    }
  }
</script>

<style scoped>
  .v-list-item:hover {
    background-color: #424141;
    border-radius: 5px !important;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #b7bbc2;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #d9760c;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #953813;
  }
</style>
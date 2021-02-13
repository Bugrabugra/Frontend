<template>
  <v-container>
    <DeleteDialog/>
    <v-row justify="center" align="center" >
      <v-col cols="12">
        <v-card
            elevation="10"
            class="mx-auto"
            tile
            dark
        >
          <v-card-title style="background-color: #393737; color: white;">Ürünler ve Etiket Durumları ({{$store.state.products ? $store.state.products.length : 0}} Ürün)</v-card-title>

          <v-btn v-if="!currentUser" class="ml-2 mt-1" @click="$router.push('/')">GİRİŞ</v-btn>
          <v-text-field class="ml-2 mt-1" v-else v-text="currentUser"></v-text-field>
          <v-btn v-if="currentUser === 'selviburcuozturk@gmail.com'" color="green" class="ml-2 mt-1" @click="$router.push('/addproduct')">ÜRÜN EKLE</v-btn>

          <v-text-field
              class="ma-2"
              label="Ürün Adı Ara"
              v-model="search"
              outlined
              hide-details
              clearable
          />

          <v-divider/>

          <v-list style="max-height: 500px; overflow-y: auto">
            <v-list-item
                v-for="(product, i) in filteredProducts"
                :key="i"
            >
              <v-container>
                <v-row>
                  <v-list-item-content>
                    <v-list-item-title style="color: #00bfff; font-size: large;">{{product.name}}</v-list-item-title>
                  </v-list-item-content>
                </v-row>

                <v-row>
                  <v-container class="ma-0 pa-0">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-text-field
                            label="Mevcut durumu"
                            v-model="product.situation"
                            disabled
                            hide-details
                        />
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="10">
                        <v-select
                            label="Durumunu değiştir"
                            :items="filteredSituations"
                            item-text="name"
                            @change="setSituation(product, $event)"
                            class="mb-2"
                            hide-details
                        />
                      </v-col>

                      <v-col cols="2" v-if="currentUser === 'selviburcuozturk@gmail.com'">
                        <v-btn
                            class="pl-2"
                            @click="openDeleteDialog(product)"
                            color="red"
                            icon
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
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
  import DeleteDialog from "./DeleteDialog";


  export default {
    name: "ListProduct",

    components: {DeleteDialog},

    data() {
      return {
        situations: [],
        select: "",
        search: "",
        deleteDialog: false
      }
    },

    computed: {
      filteredProducts() {
        return this.$store.state.products.filter(product => {
          if (this.search) {
            return product.name.toLowerCase().includes(this.search.toLowerCase());
          } else {
            return product;
          }
        })
      },

      currentUser() {
        return this.$store.state.user;
      },

      filteredSituations() {
        return this.$store.state.situations.filter(situation => {
          return situation.users.includes(this.currentUser);
        })
      }
    },

    methods: {
      setSituation(product, value) {
        this.$store.dispatch("setSituation", {product, value})
      },

      openDeleteDialog(product) {
        this.$store.dispatch("deleteDialog", {product: product, open: true});
      }
    },

    mounted() {
      this.$store.dispatch("realtimeListener");
      this.$store.dispatch("getProducts")
      this.$store.dispatch("getSituations");

      console.log(this.currentUser);
    }
  }
</script>

<style scoped>
  .v-list-item {
    border: #c6eeee 1px solid;
  }

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
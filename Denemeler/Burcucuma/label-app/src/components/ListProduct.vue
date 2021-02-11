<template>
  <v-container style="margin: auto 0;">
    <v-row justify="center" align="center">
      <v-col cols="8">
        <v-card
            class="mx-auto"
            tile
        >
          <v-list rounded>
            <v-subheader>Etiketler</v-subheader>
            <v-list-item
                v-for="(product, i) in products"
                :key="i"
            >
              <v-list-item-content>
                <v-list-item-title>{{product.name}}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-select
                    :items="situations"
                    label="Durum"
                    item-text="name"
                    v-model="select"
                >

                </v-select>
              </v-list-item-action>
            </v-list-item>

          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
  import {db} from "../firebase/config"


  export default {
    name: "ListProduct",
    data() {
      return {
        products: [],
        situations: [],
        select: ""
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
      }
    },

    mounted() {
      this.getProducts();
      this.getSituations();
    }
  }
</script>

<style scoped>

</style>
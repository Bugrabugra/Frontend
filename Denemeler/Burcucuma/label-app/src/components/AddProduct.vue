<template>
  <v-container style="margin: auto 0;">
    <v-row justify="center" align="center">
      <v-col cols="8">
        <v-card class="mx-auto">
          <v-form>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                      v-model="productName"
                      label="Ürün Adı"
                      required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-btn @click.prevent="submit" color="green" block >Ekle</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {db} from "../firebase/config"


  export default {
    name: "AddProduct",

    data() {
      return {
        productName: "",

      }
    },

    methods: {
      submit() {
        db
          .collection("products")
          .add({
            name: this.productName,
            situation: "Etiket onaylandı"
          })
      }
    }
  }
</script>

<style scoped>

</style>
<template>
  <v-container style="margin: auto 0;">
    <v-dialog
        elevation="4"
        v-model="dialog"
        width="300"
        dark
    >
      <v-card elevation="10">
        <v-card-title>
          <v-container>
            <v-row justify="center">
              {{productName}}
            </v-row>

            <v-row justify="center">
              başarıyla eklendi!
            </v-row>
          </v-container>

        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>

          <v-btn
              color="primary"
              @click="closeDialog"
              block
          >
            Kapat
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row justify="center" align="center">
      <v-col cols="10">
        <v-card dark class="mx-auto">
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
        dialog: false
      }
    },

    methods: {
      submit() {
        db.collection("products")
          .add({
            name: this.productName,
            situation: "Etiket onaylandı"
          }).then(() => {
            this.dialog = true;
        })
      },

      closeDialog() {
        this.dialog = false;
        this.productName = "";
        this.$router.push("/products");
      }
    }
  }
</script>

<style scoped>

</style>
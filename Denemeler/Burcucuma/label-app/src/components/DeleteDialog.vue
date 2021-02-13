<template>
  <v-dialog
      elevation="4"
      v-model="$store.state.deleteDialog"
      width="400"
      dark
      persistent
  >
    <v-card elevation="10" outlined height="120">
      <v-card-title>
        <v-container>
          <v-row justify="center">
            Kayıt silinecektir?
          </v-row>
        </v-container>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn
                color="grey"
                @click="closeDialog"
                block
            >
              İPTAL
            </v-btn>
          </v-col>

          <v-col>
            <v-btn
                color="red"
                @click="deleteProduct"
                block
            >
              SİL
            </v-btn>
          </v-col>
        </v-row>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "DeleteDialog",

    data() {
      return {

      }
    },

    methods: {
      closeDialog() {
        this.$store.dispatch("deleteDialog", false);
      },

      deleteProduct() {
        this.$store.dispatch("deleteProduct");
        this.$store.dispatch("deleteDialog", false);
      }
    }
  }
</script>

<style scoped>

</style>
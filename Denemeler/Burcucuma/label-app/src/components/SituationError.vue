<template>
  <v-dialog
      elevation="4"
      v-model="$store.state.errorDialog"
      width="400"
      dark
      persistent
  >
    <v-card elevation="10" outlined height="160">
      <v-card-title>
        <v-container>
          <v-row justify="center">
            <span>İşlem sırası hatalıdır.</span>
            <span>Lütfen sıradaki işlemi seçiniz.</span>
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
              KAPAT
            </v-btn>
          </v-col>
        </v-row>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "SituationError",

    methods: {
      closeDialog() {
        this.$store.dispatch("errorDialog", false);
      },
    }
  }
</script>
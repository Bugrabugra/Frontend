<template>
  <v-dialog
      v-model="$store.getters.ruleDialog"
      persistent
      max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        Kurallar
      </v-card-title>

      <v-card-text>
        <p class="ma-0">- 5 saniyede bir yeni bir şehir sorulacaktır.</p>
        <p class="ma-0">- Doğru şehrin üzerine tıklayınız.</p>
        <p class="ma-0">- 5 saniye içinde doğru bildiğiniz sürece oyun devam edecektir.</p>
      </v-card-text>

      <v-card-actions>
        <v-btn color="green darken-1" @click="startGame" block>
          Oyuna Başla
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "RulesDialog",

    props: {
      dialog: {
        type: Boolean
      }
    },

    methods: {
      startGame() {
        this.$store.dispatch("showRuleDialog", false);
        this.$store.dispatch("gameStarted", true);
        this.$store.dispatch("correctCity");

      }
    }
  }
</script>
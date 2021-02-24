<template>
  <v-flex sm8 offset-sm2>
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>New Message</v-toolbar-title>
      </v-toolbar>
      <v-form>
        <v-container>
          <v-layout>
            <v-flex xs12 md4>
              <v-text-field v-model="messageBody" label="Message" required/>
            </v-flex>
          </v-layout>
          <v-btn @click="submit">Submit</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    name: "NewMessage",

    data() {
      return {
        messageBody: ""
      }
    },

    methods: {
      async submit() {
        try {
          await this.$store.dispatch("newMessage", this.messageBody);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
</script>
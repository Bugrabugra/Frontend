<template>
  <div>
    <v-flex sm8 offset-sm2>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>Messages</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-item
              v-for="(message, index) in $store.state.messages"
              :key="index"
              :to="'message/' + index"
          >
            <v-list-item-content>
              <v-list-item-title>{{message.text}}</v-list-item-title>
              <v-list-item-subtitle>{{message.user}}</v-list-item-subtitle>

            </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
  export default {
    name: "Messages",

    async created() {
      await this.$store.dispatch("getMessages");
    }
  }
</script>
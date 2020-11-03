<template>
  <div class="team">
    <div class="mx-4">
      <h1 class="subheading grey--text pl-3">Team</h1>

      <v-container class="my-5">
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="person in team" v-bind:key="person.name">
            <v-card class="text-sm-center ma-3">
              <v-responsive class="pt-4">
                <v-avatar size="100" class="grey lighten-2">
                  <img v-bind:src="person.avatar" alt="none">
                </v-avatar>
              </v-responsive>
              <v-card-text>
                <div class="headline">{{person.name}}</div>
                <div class="grey--text">{{person.role}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="grey">
                  <v-icon left>mdi-message-text</v-icon>
                  <span>Message</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Team",

    data() {
      return {
        team: [
          {name: 'The Net Ninja', role: 'Web developer', avatar: "/avatar-1.png"},
          {name: 'Ryu', role: 'Graphic designer', avatar: "/avatar-2.png"},
          {name: 'Chun Li', role: 'Web developer', avatar: "/avatar-3.png"},
          {name: 'Gouken', role: 'Social media maverick', avatar: "/avatar-4.png"},
          {name: 'Yoshi', role: 'Sales guru', avatar: "/avatar-5.png"}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
<template>
  <div class="d-flex align-center" style="margin-left: auto">
    <v-menu open-on-hover bottom offset-y>

      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-on:click="showProfile">
          <v-list-item-action>
            <v-icon>mdi-clipboard-text</v-icon>
          </v-list-item-action>

          <v-list-item-title>Show Profile</v-list-item-title>
        </v-list-item>

        <v-list-item v-on:click="logOut">
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>

          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>


    </v-menu>

    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <v-dialog v-model="profileDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="First name" v-model="user.first" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Last name" v-model="user.last" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email" v-model="user.email" hint="This is also your login username" persistent-hint required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password" v-model="user.password" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Verify Password" v-model="user.verifyPassword" type="password"
                              hint="When changing your password, please enter twice" persistent-hint
                              :rules="[
                    () => user.password == user.verifyPassword || 'Passwords entered do not match'
                  ]"
                              required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.native="profileDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveProfile">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "HeaderActions",

    data () {
      return {
        profileDialog: false,
        user: {
          first: '',
          last: '',
          email: '',
          password: '',
          verifyPassword: '',
          isActive: true
        }
      }
    },
    methods: {
      showProfile: function () {
        this.profileDialog = true
      },
      saveProfile: function () {
        let vm = this
        this.$store.dispatch('updateUserProfile', this.user).then(() => {
          vm.password = vm.verifyPassword = ''
        })
        this.profileDialog = false
      },
      logOut: function () {
        // TODO
        console.log('User logout requested...')
      }
    },
    mounted: function () {
      const loggedInUser = this.$store.state.user

      this.user.first = loggedInUser.first
      this.user.last = loggedInUser.last
      this.user.email = loggedInUser.email
    }
  }
</script>

<style>

</style>

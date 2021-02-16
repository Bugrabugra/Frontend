<template>
  <div>
    <v-app-bar
        color="blue darken-3"
        app
        dark
        clipped-left
    >
      <v-app-bar-title>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span>Globomantics Rewards</span>
      </v-app-bar-title>
      <!-- <v-text-field
        light
        solo
        prepend-icon="search"
        placeholder="Search"
        style="max-width: 500px; min-width: 128px"
      ></v-text-field> -->
      <!-- <header-actions></header-actions> -->
      <HeaderActions/>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        fixed
        clipped
        app
        class='mt-5'
        style='top: 35px'
        permanent
    >
      <v-list dense>
        <template v-for="(item, ndx) in menuItems">
          <v-row
              row
              v-if="item.heading"
              align-center
              :key="ndx"
          >
            <v-col xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>

            <v-col xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>

          <v-list-group v-else-if="item.children" v-model="item.model" v-bind:key="ndx" no-action>
            <v-list-item slot="item" @click="menuAction">
              <v-list-item-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>

            </v-list-item>

            <v-list-item
                v-for="(child, i) in item.children"
                :key="i"
                @click="menuAction"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>

            </v-list-item>
          </v-list-group>

          <v-list-item v-else @click="menuAction" v-bind:key="ndx">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-row>
          <Transactions/>
        </v-row>
      </v-container>
    </v-main>
    <EditTransaction/>
  </div>
</template>

<script>
  import Transactions from './Transactions.vue'
  import EditTransaction from './EditTransactions.vue'
  import HeaderActions from "./HeaderActions";

  export default {
    name: 'Home',

    components: {
      HeaderActions,
      Transactions,
      EditTransaction
    },

    data: () => ({
      dialog: false,
      drawer: null,
      menuItems: [
        { icon: 'mdi-contacts', text: 'Add Transaction' },
        { icon: 'mdi-history', text: 'Current Month' },
        { icon: 'mdi-content-copy', text: 'Notes' },
        { icon: 'mdi-cog', text: 'Settings' },
        { icon: 'mdi-message', text: 'Send feedback' },
        { icon: 'mdi-help', text: 'Help' }
      ]
    }),

    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      }
    },

    methods: {
      menuAction() {

      },
      showProfile() {
        console.log('Show profile clicked!')
      }
    },

    mounted() {
      console.log("Is user logged in?", this.isLoggedIn);
      if (!this.isLoggedIn) {
        this.$router.push({path: "/login"});
      }
    }
  }
</script>

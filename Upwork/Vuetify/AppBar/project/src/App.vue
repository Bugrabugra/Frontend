<template>
  <v-app>
    <v-container>
      <v-card class="overflow-hidden" rounded>

        <v-btn
            @click="drawer = true"
            icon
            dark
            style="position:absolute; top: 5px; left: 5px; z-index: 2;"
        >
          <v-icon
              class="hamburger"
              color="#fff"
              style="position:relative; z-index: 2; cursor:pointer;"
          >
            mdi-reorder-horizontal
          </v-icon>
        </v-btn>

        <v-app-bar
            ref="appbar"
            height="50px"
            absolute
            hide-on-scroll
            color=primary
            dark
            scroll-target="#scrolling-techniques-5"
            shrink-on-scroll
            prominent
            src="https://picsum.photos/1920/1080?random"
            fade-img-on-scroll
            scroll-threshold="500"
        >
          <template v-slot:img="{ props }">
            <v-img
                v-bind="props"
                gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>

          <template v-slot:extension>
            <v-tabs align-with-title>
              <v-tab>Tab 1</v-tab>
              <v-tab>Tab 2</v-tab>
              <v-tab>Tab 5</v-tab>
              <v-spacer></v-spacer>
            </v-tabs>
          </template>

          <!--<v-app-bar-nav-icon></v-app-bar-nav-icon>-->


        </v-app-bar>
        <v-sheet
            id="scrolling-techniques-5"
            class="overflow-y-auto"
            max-height="600"
        >
          <v-container style="height: 1500px;"></v-container>
        </v-sheet>

        <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
        >
          <v-list
              nav
              dense
          >
            <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Account</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>

      </v-card>

    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    drawer: false,
    group: null,
  }),

  methods: {

  },

  mounted() {

  },

  watch: {
    showImage() {
      console.log(this.showImage)
    }
  }
};
</script>

<style>

</style>

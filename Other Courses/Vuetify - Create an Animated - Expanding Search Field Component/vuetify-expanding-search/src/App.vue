<template>
  <v-app>
    <v-app-bar
        absolute
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
        src="https://picsum.photos/1920/1080?random"
        fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-col>
        <v-row>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <v-text-field
              @focus="searchClosed = false"
              @blur="searchClosed = true"
              placeholder="Search"
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              class="mt-1 expanding-search"
              :class="{'closed': searchClosed && !search}"
              filled
              dense
              clearable
          />
        </v-row>

        <v-row>
          <v-app-bar-title>Expanding Search</v-app-bar-title>
        </v-row>

      </v-col>





      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-app>
</template>

<script>
  import HelloWorld from './components/HelloWorld';


  export default {
    name: 'App',

    components: {
      HelloWorld,
    },

    data: () => ({
      searchClosed: true,
      search: null
    }),
  };
</script>

<style lang="sass">
  .v-input.expanding-search
    transition: max-width 0.5s
    .v-input__slot
      cursor: pointer !important
      &:before, &:after
        border-color: transparent !important
    &.closed
      max-width: 45px
      .v-input__slot
        background: transparent !important
</style>

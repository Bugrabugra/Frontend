<template>
  <v-container>
    <v-row justify="center">
      <!--Bootstrap icons-->
      <v-col class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-6">
        <h1 class="font-weight-medium">Bootstrap Icons</h1>
        <p class="heading">Free, high quality, open source icon library with over 1,300 icons. Include them anyway you like—SVGs, SVG sprite, or web fonts. Use them with or without Bootstrap in any project.</p>
        <div style="width: 300px;">
          <v-sheet rounded color="grey lighten-3" class="font-weight-light pa-4">
            <span style="color: #bfb7b7">$ </span>npm i bootstrap-icons
            <v-icon class="float-right">mdi-content-paste</v-icon>
          </v-sheet>
        </div>
      </v-col>

      <!--Bootstrap logo-->
      <v-col class="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 order-first order-lg-last">
        <v-img src="@/assets/icons-hero.png"></v-img>
      </v-col>
    </v-row>

    <v-divider class="ma-6"/>

    <v-row justify="center">
      <IconsSection/>
    </v-row>
  </v-container>
</template>

<script>
  import IconsSection from "../components/IconsSection";
  export default {
    name: 'Home',

    components: {
      IconsSection

    },
  }
</script>

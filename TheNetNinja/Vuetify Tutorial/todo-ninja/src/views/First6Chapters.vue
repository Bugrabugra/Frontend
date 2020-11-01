<template>
  <div class="home">
    <h1>Homepage</h1>
    <p class="red white--text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias delectus distinctio eligendi enim fuga necessitatibus sed vitae voluptatem. At eos id in laboriosam, nesciunt omnis provident quae quos recusandae voluptate!</p>
    <p class="pink lighten-4 red--text text--darken-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias delectus distinctio eligendi enim fuga necessitatibus sed vitae voluptatem. At eos id in laboriosam, nesciunt omnis provident quae quos recusandae voluptate!</p>
    <h1 class="display-4">Massive Display</h1>
    <h4 class="display-1">Smaller Display</h4>
    <p class="headline">This is a headline</p>
    <p class="subheading font-weight-bold">This is a subheading</p>
    <p class="caption">This is a caption</p>

    <v-btn class="pink white--text">click me</v-btn>
    <v-btn depressed color="pink">click me</v-btn>
    <v-btn flat color="pink">click me</v-btn>

    <v-btn depressed class="pink white--text">
      <v-icon left>mdi-email</v-icon>
      <span>email me</span>
    </v-btn>

    <v-btn depressed small class="pink white--text">
      <v-icon left small>mdi-email</v-icon>
      <span>email me</span>
    </v-btn>

    <v-btn depressed large class="pink white--text">
      <span>email me</span>
      <v-icon right large>mdi-email</v-icon>
    </v-btn>

    <v-btn depressed small fab dark color="purple">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn class="hidden-md-and-down">click me down</v-btn>
    <v-btn class="hidden-md-and-up">click me up</v-btn>
    <v-btn class="hidden-sm-only">click me only</v-btn>


  </div>
</template>

<script>
  export default {
    name: 'First6Chapters',
    components: {

    }
  }
</script>

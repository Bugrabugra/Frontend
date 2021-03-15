<template>
  <v-card
      elevation="8"
      class="city-panel"
      style="z-index: 2;"
      :loading="loading"
  >
    <template slot="progress">
      <v-progress-linear
          color="blue"
          height="10"
          v-model="value"

      ></v-progress-linear>
    </template>


    <v-container fluid class="ma-0 pa-0 text-center" >
      <!--Tahmin edilecek şehir-->
      <transition name="fade">
        <div v-if="$store.getters.result !== 'Yanlış!' && !$store.getters.outOfTime" class="fade text-center font-weight-bold" style="font-size: 30px">
          {{$store.getters.correctCity}}
        </div>
      </transition>

      <!--Süreniz doldu-->
      <transition name="fade">
        <div v-if="$store.getters.outOfTime" class="fade text-center font-weight-bold" style="font-size: 30px">
          Süreniz doldu! =(
        </div>
      </transition>

      <!--Sonuç-->
      <transition name="fade">
        <div class="fade" style="font-size: 30px" v-if="$store.getters.result === 'Yanlış!'">
          <span class="font-weight-bold">{{$store.getters.result}} </span>
          <span class="font-weight-bold">Tahmininiz {{$store.getters.guessedCity}} idi =(</span>
        </div>
      </transition>

      <!--Puan-->
      <transition name="fade">
        <div class="fade text-center font-weight-bold" style="font-size: 30px">
          <v-chip color="rgb(27,114,144)" dark pill>{{$store.getters.score}}</v-chip>
        </div>
      </transition>

      <!--Yeniden oyna-->
      <transition name="fade">
        <div v-if="$store.getters.result === 'Yanlış!' || $store.getters.outOfTime" class="fade text-center ma-2">
          <v-btn @click="startNewGame">Yeniden Oyna</v-btn>
        </div>
      </transition>

    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: "CityPanel",

    data() {
      return {
        loading: false,
        value: 0,
        interval: null,
      }
    },

    methods: {
      startNewGame() {
        this.$store.dispatch("result", "");
        this.$store.dispatch("deleteScore")
        this.$store.dispatch("correctCity");
        this.$store.dispatch("gameStarted", true);
      },

      startLoading() {
        this.$store.dispatch("outOfTime", false);
        this.loading = true;
        this.stopLoading()
        this.interval = setInterval(() => {
          if (this.value === 100) {
            this.stopLoading();
            this.$store.dispatch("gameStarted", false);
            this.$store.dispatch("outOfTime", true);
          }
          else if (this.$store.getters.gameStarted) {
            this.value += 20;
          }

        }, 1000)
      },

      stopLoading() {
        clearInterval(this.interval);
        this.value = 0;
      }
    },

    computed: {
      gameStarted() {
        return this.$store.getters.gameStarted;
      },

      correctCity() {
        return this.$store.getters.correctCity;
      }
    },

    watch: {
      gameStarted() {
        if (!this.$store.getters.gameStarted) {
          this.stopLoading();
          this.loading = false;
        }
      },

      correctCity() {
        if (this.$store.getters.correctCity && this.$store.getters.gameStarted) {
          this.startLoading();
        } else {
          this.loading = false;
          this.value = 0;
          clearInterval(this.interval);
        }
      }
    }
  }
</script>

<style>
  .city-panel {
    background: linear-gradient(to left, #d98695, #e7abb3);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
    transform: scale(1);

  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: scale(0);
  }
</style>
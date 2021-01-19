<template>
  <div class="player">
    <div class="player__sizer">
      <video
          ref="video"
          @play="onVideoPlay"
          @pause="onVideoPause"
          @click="togglePlay"
          @volumechange="onVideoVolumeChange"
      >
        <source type="video/mp4" src="@/assets/video.mp4">
      </video>
    </div>
    <div class="player__gradient"/>
    <div class="player__controls">
      <v-toolbar
          dense
          color="transparent"
          flat
          class="player__toolbar"
      >
        <v-btn color="white" icon @click="togglePlay">
          <v-icon>
            {{isPlaying ? "mdi-pause" : "mdi-play"}}

          </v-icon>
        </v-btn>

        <v-btn
            color="white"
            icon
            @click="toggleSound"
        >
          <v-icon>
            {{isMuted ? "mdi-volume-off" : "mdi-volume-high"}}
          </v-icon>
        </v-btn>

        <Slider
            class="player__sound-slider mr-5"
            :style="{width: '96px'}"
            :value="isMuted ? 0 : volume"
            @input="onVolumeSliderChange"
        />

        <div class="player__time">
          00:00:00
        </div>

        <v-spacer/>

        <v-btn color="white" icon>
          <v-icon>
            mdi-fullscreen
          </v-icon>
        </v-btn>

      </v-toolbar>
    </div>
  </div>
</template>

<script>
  import "./Player.scss"
  import Slider from "../Slider/Slider";


  export default {
    name: "Player",

    components: {Slider},

    data() {
      return {
        isPlaying: false,
        isMuted: false,
        volume: 1
      }
    },

    mounted() {
      document.addEventListener("keyup", this.onDocumentKeyUp);
    },

    methods: {
      onDocumentKeyUp(e) {
        if (e.keyCode === 32) {
          this.togglePlay();
        }
      },

      onVideoVolumeChange() {
        const {video} = this.$refs;

        this.isMuted = video.muted;
        this.volume = video.volume;
      },

      onVolumeSliderChange(value) {
        const {video} = this.$refs;

        if (video.muted && value > 0) {
          video.muted = false;
        }
        if (value <= 0) {
          video.muted = true;
        }

        video.volume = value;
      },

      togglePlay() {
        const {video} = this.$refs;

        if (video.paused) {
          video.play()
        } else {
          video.pause();
        }
      },

      toggleSound() {
        const {video} = this.$refs;

        if (video.volume <= 0) {
          video.volume = 0.5;
        }
        video.muted = !video.muted;
      },

      onVideoPlay() {
        this.isPlaying = true;
      },

      onVideoPause() {
        this.isPlaying = false;
      },
    }
  }
</script>
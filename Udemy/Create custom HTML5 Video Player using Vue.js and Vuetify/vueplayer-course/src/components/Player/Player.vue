<template>
  <div class="player">
    <div class="player__sizer">
      <video
          ref="video"
          @play="onVideoPlay"
          @pause="onVideoPause"
          @click="togglePlay"
          @volumechange="onVideoVolumeChange"
          @loadedmetadata="onVideoLoadedMetaData"
          @timeupdate="onVideoTimeUpdate"
          @progress="onVideoProgress"
          @loadstart="isLoading = true"
          @loadeddata="isLoading = false"
          @waiting="isWaiting = true"
          @canplay="isWaiting = false"
      >
        <source :type="source.type" :src="source.src">
      </video>
    </div>
    <div class="player__gradient"/>

    <div class="player__loader" v-show="isLoading || isWaiting">
      <v-progress-circular :size="128" color="white" indeterminate/>
    </div>

    <div class="player__controls">
      <Slider
          class="player__seeker"
          :max="duration"
          :value="currentTime"
          @input="seek"
      >
        <template #bar>
          <div class="player__seeker-buffered" :style="bufferedStyle"/>
        </template>
      </Slider>

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

        <v-btn color="white" icon @click="toggleSound">
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
          {{currentTimeFormatted}} / {{durationFormatted}}
        </div>

        <v-spacer/>

        <v-btn color="white" icon @click="toggleFullscreen">
          <v-icon>
            {{isFullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen"}}
          </v-icon>
        </v-btn>

      </v-toolbar>
    </div>
  </div>
</template>

<script>
  import "./Player.scss"
  import Slider from "../Slider/Slider";

  const TimeFormat = require("hh-mm-ss");
  const screenfull = require("screenfull");

  export default {
    name: "Player",

    components: {Slider},

    props: {
      source: {
        type: Object,
        required: true,
        validator: source => source.type && source.src
      }
    },

    data() {
      return {
        isPlaying: false,
        isMuted: false,
        isFullscreen: false,
        isLoading: false,
        isWaiting: false,
        volume: 1,
        duration: 0,
        currentTime: 0,
        buffered: 0
      }
    },

    computed: {
      currentTimeFormatted() {
        return TimeFormat.fromS(Math.round(this.currentTime), "hh:mm:ss");
      },

      durationFormatted() {
        return TimeFormat.fromS(Math.round(this.duration), "hh:mm:ss");
      },

      bufferedStyle() {
        return {
          transformOrigin: "left center",
          transform: `scaleX(${this.buffered})`
        }
      }
    },

    mounted() {
      document.addEventListener("keyup", this.onDocumentKeyUp);
      screenfull.onchange(this.onFullscreenChange);
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

      onVideoLoadedMetaData() {
        const {video} = this.$refs;

        this.duration = video.duration;
        this.currentTime = video.currentTime;
      },

      onVideoTimeUpdate() {
        const {video} = this.$refs;

        this.currentTime = video.currentTime;
      },

      onFullscreenChange() {
        this.isFullscreen = this.$el === screenfull.element
      },

      onVideoProgress() {
        const {video} = this.$refs;
        const {duration} = video;
        
        if (duration > 0) {
          const {currentTime, buffered} = video;
          const bufferedLength = buffered.length;

          for (let i = 0; i < bufferedLength; i++) {
            const start = buffered.start(i);
            const end = buffered.end(i);

            if (start < currentTime && end > currentTime) {
              this.buffered = end / duration;
            }
          }
        }
      },

      toggleFullscreen() {
        if (!screenfull.isEnabled) return;

        const {$el} = this;
        if (screenfull.element === $el) {
          screenfull.exit();
        } else {
          screenfull.request($el);
        }
      },

      seek(time) {
        const {video} = this.$refs;

        this.currentTime = time;
        video.currentTime = time;
      }
    },

    watch: {
      source() {
        this.isPlaying = false;
        this.isWaiting = false;
        this.buffered = 0;
        this.currentTime = 0;

        this.$nextTick(() => {
          this.$refs.video.load();
        })
      }
    }
  }
</script>
<template>
  <div class="player">
    <div class="player__sizer">
      <video>
        <source type="video/mp4" src="@/assets/video.mp4">
      </video>
    </div>
  </div>
</template>

<script>
  import "./Player.scss"


  export default {
    name: "Player",
    data() {
      return {}
    }
  }
</script>
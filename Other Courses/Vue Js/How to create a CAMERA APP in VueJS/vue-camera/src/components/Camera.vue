<template>
  <div class="camera">
    <video autoplay class="feed"></video>
    <button @click="takePicture" class="snap">Snap</button>
  </div>
</template>

<script>
  import {onBeforeMount} from "vue";


  export default {
    name: "Camera",
    setup(_, {emit}) {
      // Methods
      const init = () => {
        if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
          let constraints = {
            video: {
              width: {
                min: 640,
                ideal: 1280,
                max: 1920
              },
              height: {
                min: 360,
                ideal: 720,
                max: 1080
              }
            }
          };

          navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
              const videoPlayer = document.querySelector("video");
              videoPlayer.srcObject = stream;
              videoPlayer.play();
            })
        } else {
          alert("Can not get media devices");
        }
      };

      const takePicture = () => {
        emit("takePicture");
      };

      // Mount
      onBeforeMount(() => {
        init();
      })

      return {takePicture}
    }
  }
</script>

<style lang="scss" scoped>
  .camera {
    width: 100vw;
    height: 100vh;
    padding: 25px;
    box-sizing: border-box;

    .feed {
      display: block;
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      background-color: #171717;
      box-shadow: 6px 6px 12px 0 rgba(0, 0, 0, 0.35);
    }

    .snap {
      display: block;
      width: 75px;
      height: 75px;
      border-radius: 50%;
      background-color: transparentize($color: #ffce00, $amount: 0.5);
      border: 1px solid #171717;
      outline: none;
      cursor: pointer;
      margin: 25px auto;

      &:hover {
        background-color: #ffce00;
      }

      &:active {
        background-color: darken($color: #ffce00, $amount: 15);
      }
    }
  }
</style>
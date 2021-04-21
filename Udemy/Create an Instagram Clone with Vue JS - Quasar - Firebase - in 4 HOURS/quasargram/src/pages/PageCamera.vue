<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        v-show="!imageCaptured"
        ref="video"
        class="full-width"
        autoplay
      />

      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"
      />
    </div>

    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCameraSupport"
        @click="captureImage"
        color="grey-10"
        icon="eva-camera"
        size="lg"
        round
      />

      <q-file
        v-else
        v-model="imageUpload"
        @input="captureImageFallback"
        label="Choose an image"
        accept="image/*"
        outlined
      >
       <template v-slot:prepend>
         <q-icon name="eva-attach-outline"/>
       </template>
      </q-file>

      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.caption"
          class="col col-sm-6"
          label="Caption"
          dense
        />
      </div>

      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.location"
          class="col col-sm-6"
          label="Location"
          :loading="locationLoading"
          dense
        >
          <template v-slot:append>
            <q-btn
              v-if="!locationLoading && geolocationSupported"
              @click="getLocation"
              icon="eva-navigation-2-outline"
              round
              dense
              flat
            />
          </template>
        </q-input>
      </div>

      <div class="row justify-center q-mt-lg">
        <q-btn
          @click="addPost"
          color="primary"
          label="Post Image"
          unelevated
          rounded
        />
      </div>
    </div>
  </q-page>
</template>

<script>
  import {uid} from "quasar";


  require("md-gum-polyfill");


  export default {
    name: 'PageCamera',

    data() {
      return {
        post: {
          id: uid(),
          caption: "",
          location: "",
          photo: null,
          date: Date.now()
        },
        imageCaptured: false,
        imageUpload: [],
        hasCameraSupport: true,
        locationLoading: false
      }
    },

    computed: {
      geolocationSupported() {
        if ("geolocation" in navigator) {
          return true;
        } else {
          return false;
        }
      }
    },

    methods: {
      initCamera() {
        navigator.mediaDevices.getUserMedia({
          video: true,
        }).then(stream => {
          this.$refs.video.srcObject = stream;
        }).catch(error => {
          this.hasCameraSupport = false;
        })
      },

      captureImage() {
        let video = this.$refs.video;
        let canvas = this.$refs.canvas;

        canvas.width = video.getBoundingClientRect().width;
        canvas.height = video.getBoundingClientRect().height;
        let context = canvas.getContext("2d");

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.imageCaptured = true;
        this.post.photo = this.dataURItoBlob(canvas.toDataURL());
        this.disableCamera();
      },

      captureImageFallback(file) {
        this.post.photo = file;
        let canvas = this.$refs.canvas;
        let context = canvas.getContext("2d");

        const reader = new FileReader();
        reader.onload = (event) => {
          let img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            this.imageCaptured = true;
          }
          img.src = event.target.result;
        }
        reader.readAsDataURL(file);
      },

      disableCamera() {
        this.$refs.video.srcObject.getVideoTracks().forEach(track => {
          track.stop();
        })
      },

      dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const buffer = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          buffer[i] = byteString.charCodeAt(i);
        }

        return new Blob([arrayBuffer], {type: mimeString});
      },

      getLocation() {
        this.locationLoading = true;
        navigator.geolocation.getCurrentPosition(position => {
          this.getCityAndCountry(position);
        }, error => {
          this.locationError();
        }, {timeout: 7000})
      },

      getCityAndCountry(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let apiURL = `https://geocode.xyz/${latitude},${longitude}?json=1`

        this.$axios.get(apiURL)
          .then(response => {
            this.locationSuccess(response);
          }).catch(error => {
          this.locationError();
        })
      },

      locationSuccess(response) {
        this.locationLoading = false;
        this.post.location = response.data.city;
        if (response.data.country) {
          this.post.location += `, ${response.data.country}`;
        }
      },

      locationError() {
        this.locationLoading = false;
        this.$q.dialog({
          title: "Error",
          message: "Could not find your location"
        })
      },

      addPost() {
        let formData = new FormData();
        formData.append("id", this.post.id);
        formData.append("caption", this.post.caption);
        formData.append("location", this.post.location);
        formData.append("date", this.post.date);
        formData.append("file", this.post.photo, this.post.id + ".png");

        this.$axios.post(`${process.env.API}/createPost`, formData)
          .then(response => {
            console.log("response: ", response);
          })
          .catch(error => {
            console.log("error: ", error);
          })
      }
    },

    mounted() {
      this.initCamera();
    },

    beforeDestroy() {
      if (this.hasCameraSupport) {
        this.disableCamera();
      }
    }
  }
</script>

<style lang="sass">
  .camera-frame
    border: 2px solid $grey-10
    border-radius: 10px
</style>

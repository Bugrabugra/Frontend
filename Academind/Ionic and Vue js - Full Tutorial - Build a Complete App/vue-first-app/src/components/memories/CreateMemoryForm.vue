<template>
  <form class="ion-padding" @submit.prevent="submitForm">
    <IonList>
      <IonItem>
        <IonLabel position="floating">Title</IonLabel>
        <IonInput type="text" v-model="enteredTitle" required/>
      </IonItem>

      <IonItem>
        <IonThumbnail>
          <img :src="takenImageUrl"/>
        </IonThumbnail>

        <IonButton type="button" fill="clear" @click="takePhoto">
          <IonIcon slot="start" :icon="camera"></IonIcon>
          Take Photo
        </IonButton>
      </IonItem>

      <IonItem>
        <IonLabel position="floating">Description</IonLabel>
        <IonTextarea rows="5" v-model="enteredDescription"/>
      </IonItem>

    </IonList>

    <IonButton type="submit" expand="full">Save</IonButton>

  </form>
</template>

<script>
  import {IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonThumbnail, IonIcon} from "@ionic/vue";
  import {camera} from "ionicons/icons";
  import {Plugins, CameraResultType, CameraSource} from "@capacitor/core";

  const {Camera} = Plugins;

  export default {
    name: "CreateMemoryForm",

    emits: ["save-memory"],

    components: {IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonThumbnail, IonIcon},

    data() {
      return {
        enteredTitle: "",
        enteredDescription: "",
        takenImageUrl: null,
        camera
      }
    },

    methods: {
      async takePhoto() {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 60
        });

        this.takenImageUrl = photo.webPath;
      },

      submitForm() {
        const memoryData = {
          title: this.enteredTitle,
          imageUrl: this.takenImageUrl,
          description: this.enteredDescription
        };

        this.$emit("save-memory", memoryData);
      }
    }
  }
</script>

<style scoped>

</style>
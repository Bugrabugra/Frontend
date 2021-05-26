<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton :default-href="pageDefaultBackLink"></IonBackButton>
        </IonButtons>

        <IonTitle>{{pageTitle}}</IonTitle>
        <IonButtons slot="end">
          <slot name="actions-end"></slot>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <slot/>
    </IonContent>
  </IonPage>
</template>

<script>
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons
  } from "@ionic/vue";


  export default {
    name: "BaseLayout",

    props: ["pageTitle", "pageDefaultBackLink"],

    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonBackButton,
      IonButtons
    },

    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
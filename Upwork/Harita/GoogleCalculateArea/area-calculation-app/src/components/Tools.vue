<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col>
        <v-btn
            v-show="!drawActive"
            @click="startDraw"
            color="#173c00"
            style="width: 100%"
            class="white--text"
            id="draw"
        >
          <v-icon class="pr-2">
            mdi-pencil-plus
          </v-icon>
          Draw New Area
        </v-btn>

        <v-btn
            v-show="drawActive"
            color="#173c00"
            @click="stopDraw"
            style="width: 100%"
            class="white--text"
            id="not-draw"
        >
          <v-icon class="pr-2">
            mdi-close-circle
          </v-icon>
          Cancel New Area
        </v-btn>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-btn @click="capture" color="#173c00" dark block>
          <v-icon class="pr-2">
            mdi-file-export
          </v-icon>
          Save View
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import html2canvas from 'html2canvas';


  export default {
    name: "Tools",

    data() {
      return {
        drawActive: false
      }
    },

    methods: {
      startDraw() {
        this.drawActive = true;
      },

      stopDraw() {
        this.drawActive = false;
      },

      capture() {
        html2canvas(document.getElementById("toPDF"),{
          onrendered:function(canvas){
            var img=canvas.toDataURL("image/png");
            var doc = new jsPDF('l', 'cm');
            doc.addImage(img,'PNG',2,2);
            doc.save('reporte.pdf');
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
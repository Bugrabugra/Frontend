<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="300" elevation="4">
          <v-color-picker
              dot-size="18"
              hide-inputs
              mode="hexa"
              swatches-max-height="155"
          />
        </v-card>

      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col>
        <v-btn>Add color</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>

        <v-card class="mx-auto mt-6" max-width="400" elevation="4" tile>
          <v-list dark shaped>
            <v-subheader>Colors</v-subheader>

            <v-list-item v-for="color in colorsList" :key="color.id">
              <v-list-item-title>{{color.code}}</v-list-item-title>
              <v-list-item-action>
                <v-btn @click="removeColor(color.id)" x-small text color="red">Delete</v-btn>
              </v-list-item-action>

              <v-list-item-action>
                <v-btn x-small text color="blue">Edit</v-btn>
              </v-list-item-action>

            </v-list-item>
          </v-list>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import db from "../firebase/config";


  export default {
    name: "Layout",
    data() {
      return {
        colors: [],
        colorCode: "#000000",
        modal: false
      }
    },

    computed: {
      colorsList: {
        get() {
          return this.colors
        },
        set(value) {
          this.colors = value;
        }
      }
    },

    methods: {
      getColors() {
        db.collection("colors")
          .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(data => {
            if (data.type === "added") {
              this.colors.push({id: data.doc.id, ...data.doc.data()})
            } else {
              this.colors = this.colors.filter(color => {
                return data.doc.id !== color.id;
              })
            }
          })
        })
      },

      addColor() {
        db.collection("colors")
          .add({code: this.colorCode})
      },

      removeColor(id) {
        db.collection("colors")
          .doc(id)
          .delete()
      },

      openModal() {
        this.modal = true;
      }
    },

    mounted() {
      this.getColors();
    }
  }
</script>

<style scoped>

</style>
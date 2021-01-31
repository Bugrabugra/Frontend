<template>
  <v-container fluid>

    <!--Color picker-->
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="300" elevation="8">
          <v-color-picker
              v-model="colorCode"
              dot-size="18"
              mode="hexa"
              hide-inputs
              dark
          />
        </v-card>
      </v-col>
    </v-row>

    <!--Add button-->
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn class="mx-auto" elevation="8" @click="addColor" dark >Add color</v-btn>
      </v-col>
    </v-row>

    <!--Color list-->
    <v-row>
      <v-col>
        <v-card class="mx-auto mt-6" max-width="400" elevation="8" tile>
          <v-list dark shaped style="overflow-y: auto; max-height: 500px;">
            <v-subheader>Color list</v-subheader>

            <v-list-item v-for="color in colorsList" :key="color.id">
              <v-list-item-title>
                <v-chip
                    close-icon="mdi-close-outline"
                    :color="color.code"
                >{{color.code}}</v-chip>
              </v-list-item-title>

              <v-list-item-action>
                <v-btn @click="removeColor(color.id)" x-small text color="red">Delete</v-btn>
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
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #b7bbc2;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #06393b;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #139584;
  }
</style>
<template>
  <v-card
      height="400"
      width="256"
      class="mx-auto"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item>
          <v-treeview
              dense
              :items="items"
          ></v-treeview>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            id: 1,
            name: 'Cari hesap',
            children: [
              { id: 2, name: 'Cari hesap yarat' },
              { id: 3, name: 'Cari hesap sil' },
            ],
          },
        ],
        right: null,
      }
    },
  }
</script>

<style scoped>

</style>
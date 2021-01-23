<template>
  <v-navigation-drawer clipped permanent stateless>
    <v-list nav dense>
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

</template>

<script>
  export default {
    name: "Drawer",
    data() {
      return {
        items: [
          {title: "View1", to: "view1"},
          {title: "View2", to: "view2"},
          {title: "View3", to: "view3"}

        ]
      }
    }
  }
</script>

<style scoped>

</style>
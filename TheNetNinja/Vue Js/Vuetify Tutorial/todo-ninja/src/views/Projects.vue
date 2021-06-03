<template>
  <div class="projects">
    <div class="mx-4">
      <h1 class="subheading grey--text pl-3">Projects</h1>

      <v-container class="my-5">
        <v-row justify="center">
          <v-expansion-panels focusable>
            <v-expansion-panel
                v-for="(project, index) in myProjects"
                v-bind:key="index"
            >
              <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
              <v-expansion-panel-content>

                <v-card-text class="px-4 grey--text">
                  <div class="font-weight-bold">Due by {{project.due}}</div>
                  {{project.content}}
                </v-card-text>

              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
  import db from "../firestore/init";


  export default {
    name: "Projects",

    data() {
      return {
        projects: []
      }
    },

    computed: {
      myProjects() {
        return this.projects.filter(project => {
          return project.person === 'The Net Ninja';
        })
      }
    },

    created() {
      db.collection("projects").onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
          if (change.type === "added") {
            this.projects.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        })
      })
    }
  }
</script>

<style scoped>

</style>
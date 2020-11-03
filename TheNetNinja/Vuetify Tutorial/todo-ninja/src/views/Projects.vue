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
  export default {
    name: "Projects",

    data() {
      return {
        projects: [
          { title: 'Design a new website', person: 'The Net Ninja', due: '1st Jan 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
          { title: 'Code up the homepage', person: 'Chun Li', due: '10th Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
          { title: 'Design video thumbnails', person: 'Ryu', due: '20th Dec 2018', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
          { title: 'Create a community forum', person: 'Gouken', due: '20th Oct 2018', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
          { title: 'Create a community forum', person: 'The Net Ninja', due: '20th Oct 2018', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        ]
      }
    },

    computed: {
      myProjects() {
        return this.projects.filter(project => {
          return project.person === 'The Net Ninja';
        })
      }
    }
  }
</script>

<style scoped>

</style>
<template>
  <div class="dashboard">
    <div class="mx-4">
      <h1 class="subheading grey--text pl-3">Dashboard</h1>

      <v-container class="my-5">
        <v-layout row class="mb-3">
          <v-tooltip top>
            <template v-slot:activator="{on}">
              <v-btn
                  small
                  text
                  depressed
                  v-on:click="sortBy('title')"
                  v-on="on"
              >
                <v-icon left color="grey">mdi-folder</v-icon>
                <span class="caption text-lowercase">By project name</span>
              </v-btn>
            </template>
            <span>Sort projects by project name</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{on}">
              <v-btn
                  small
                  text
                  depressed
                  v-on:click="sortBy('person')"
                  v-on="on"
              >
                <v-icon left color="grey">mdi-account</v-icon>
                <span class="caption text-lowercase">By person</span>
              </v-btn>
            </template>
            <span>Sort projects by person</span>
          </v-tooltip>
        </v-layout>

        <v-card flat v-for="project in projects" v-bind:key="project.title">
          <v-layout row wrap v-bind:class="`pa-3 project ${project.status}`">
            <v-flex xs12 md6>
              <div class="caption grey--text">Project Title</div>
              <div>{{project.title}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Person</div>
              <div>{{project.person}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Due by</div>
              <div>{{project.due}}</div>
            </v-flex>

            <v-flex xs2 sm4 md2>
              <div class="right">
                <v-chip small v-bind:color="colors[project.status]" class="white--text caption my-2">{{project.status}}</v-chip>
              </div>
            </v-flex>

          </v-layout>
          <v-divider></v-divider>
        </v-card>
      </v-container>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Dashboard',

    data() {
      return {
        colors: {
          complete: "#3cd1c2",
          ongoing: "#ffa300",
          overdue: "#ee0a2c"
        },
        projects: [
          { title: 'Design a new website', person: 'The Net Ninja', due: '1st Jan 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
          { title: 'Code up the homepage', person: 'Chun Li', due: '10th Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
          { title: 'Design video thumbnails', person: 'Ryu', due: '20th Dec 2018', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
          { title: 'Create a community forum', person: 'Gouken', due: '20th Oct 2018', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        ]
      }
    },

    methods: {
      sortBy(prop) {
        this.projects.sort((a, b) => {
          return a[prop] < b[prop] ? -1 : 1;
        })
      }
    },

    components: {

    },
  }
</script>

<style>
  .project.complete {
    border-left: 6px solid #3cd1c2;
  }

  .project.ongoing {
    border-left: 6px solid #ffa300;
  }

  .project.overdue {
    border-left: 6px solid #ee0a2c;
  }

</style>

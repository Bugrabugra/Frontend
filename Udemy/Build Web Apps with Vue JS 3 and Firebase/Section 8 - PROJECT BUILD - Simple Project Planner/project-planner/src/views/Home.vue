<template>
  <div class="home">
    <FilterNav @filterChange="current = $event" :current="current"/>
    <div v-if="projects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <SingleProject
            :project="project"
            @delete="handleDelete"
            @complete="handleComplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import SingleProject from "../components/SingleProject";
  import FilterNav from "../components/FilterNav";


  export default {
    name: 'Home',

    data() {
      return {
        projects: [],
        current: "all"
      }
    },

    computed: {
      filteredProjects() {
        if (this.current === "completed") {
          return this.projects.filter(project => {
            return project.complete;
          })
        } else if (this.current === "ongoing") {
          return this.projects.filter(project => {
            return !project.complete;
          })
        } else {
          return this.projects;
        }
      }
    },

    components: {
      FilterNav,
      SingleProject},

    mounted() {
      fetch("http://localhost:3000/projects")
        .then(res => res.json())
        .then(data => this.projects = data)
        .catch(err => console.log(err.message))
    },

    methods: {
      handleDelete(id) {
        this.projects = this.projects.filter(project => {
          return project.id !== id
        })
      },

      handleComplete(id) {
        let p = this.projects.find(project => {
          return project.id === id;
        });
        p.complete = !p.complete
      }
    },
  }
</script>

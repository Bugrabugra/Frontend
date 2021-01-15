<template>
  <v-list
      class="pt-0"
      flat
  >
    <draggable
        v-model="tasks"
        handle=".handle">
      <Task
          v-for="task in tasks"
          :key="task.id"
          :task="task"
      />
    </draggable>
  </v-list>
</template>

<script>
  import draggable from "vuedraggable";
  import Task from "./Task";


  export default {
    name: "ListTasks",
    components: {Task, draggable},
    computed: {
      tasks: {
        get() {
          return this.$store.getters.tasksFiltered;
        },
        set(value) {
          this.$store.dispatch("setTasks", value);
        }
      }
    }
  }
</script>
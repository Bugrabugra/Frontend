<template>
  <v-list
      class="pt-0"
      flat
  >
    <Task
        v-for="task in $store.state.tasks"
        :key="task.id"
        :task="task"
    />
  </v-list>
</template>

<script>
  import Task from "./Task";
  export default {
    name: "ListTasks",
    components: {Task}
  }
</script>

<style scoped>

</style>
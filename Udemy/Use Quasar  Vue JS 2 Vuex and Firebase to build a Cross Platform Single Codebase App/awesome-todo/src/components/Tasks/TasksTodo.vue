<template>
  <div>
    <ListHeader bgColor="bg-orange-4">Todo</ListHeader>

    <q-list bordered separator>
      <Task
        v-for="(task, key) in tasksTodo"
        :task="task"
        :key="key"
        :id="key"
      />
    </q-list>
  </div>

</template>

<script>
  import Task from "components/Tasks/Task";
  import ListHeader from "components/Shared/ListHeader";


  export default {
    name: "TasksTodo",
    components: {
      ListHeader,
      Task},
    props: ["tasksTodo"]
  }
</script>

<style scoped>

</style>

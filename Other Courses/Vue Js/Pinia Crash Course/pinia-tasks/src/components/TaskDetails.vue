<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <em class="material-icons" @click="taskStore.deleteTask(task.id)">delete</em>
      <em :class="{active: task.isFav}" class="material-icons" @click="taskStore.toggleFav(task.id)">favorite</em>
    </div>
  </div>
</template>

<script>
  import { useTaskStore } from "@/stores/TaskStore";


  export default {
    name: "TaskDetails",
    props: ["task"],
    setup() {
      const taskStore = useTaskStore();

      return { taskStore };
    }
  }
</script>

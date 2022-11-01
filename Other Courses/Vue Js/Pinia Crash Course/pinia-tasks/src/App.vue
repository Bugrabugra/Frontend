<template>
  <main>
    <!--heading-->
    <header>
      <img alt="pinia logo" src="./assets/pinia-logo.svg">
      <h1>Pinia Tasks</h1>
    </header>

    <!--new task form-->
    <div class="new-task-form">
      <TaskForm/>
    </div>

    <!--filter-->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <!--loading-->
    <div v-if="tisLoading" class="loading">Loading tasks</div>

    <!--task list-->
    <div v-if="filter === 'all'" class="task-list">
      <p>You have {{ totalCount }} tasks</p>
      <div v-for="task in tasks">
        <TaskDetails :task="task"/>
      </div>
    </div>

    <div v-if="filter === 'favs'" class="task-list">
      <p>You have {{ favCount }} favs</p>
      <div v-for="task in favs">
        <TaskDetails :task="task"/>
      </div>
    </div>

    <button @click="taskStore.$reset">reset state</button>
  </main>
</template>

<script>
  import { useTaskStore } from "@/stores/TaskStore";
  import TaskDetails from "@/components/TaskDetails.vue";
  import TaskForm from "@/components/TaskForm.vue";
  import { storeToRefs } from "pinia";
  import { ref } from "vue";


  export default {
    components: { TaskForm, TaskDetails },
    setup() {
      const taskStore = useTaskStore();

      const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore);

      // fetch tasks
      taskStore.getTasks();

      const filter = ref("all");

      return { taskStore, filter, tasks, isLoading, favs, totalCount, favCount };
    }
  }
</script>


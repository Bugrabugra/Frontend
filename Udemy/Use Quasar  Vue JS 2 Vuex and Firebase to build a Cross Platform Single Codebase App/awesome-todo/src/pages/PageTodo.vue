<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <div class="row q-mb-lg">
        <!--Search-->
        <Search/>

        <!--Sort-->
        <Sort/>
      </div>

      <!--No tasks message-->
      <p
        v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length"
      >No search results</p>

      <q-scroll-area class="q-scroll-area-tasks">
        <!--No tasks-->
        <NoTasks v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"/>

        <!--Not completed-->
        <TasksTodo v-if="Object.keys(tasksTodo).length" :tasksTodo="tasksTodo"/>

        <!--Completed-->
        <TasksCompleted
          v-if="Object.keys(tasksCompleted).length"
          :tasksCompleted="tasksCompleted"
          class="q-mb-xl"
        />
      </q-scroll-area>

      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          @click="showAddTask = true"
          class="all-pointer-events"
          color="primary"
          size="24px"
          icon="add"
          round
        />
      </div>
    </div>

    <q-dialog v-model="showAddTask">
      <AddTask @close="showAddTask = false"/>
    </q-dialog>

  </q-page>
</template>

<script>
  import {mapGetters, mapState} from "vuex";
  import AddTask from "components/Tasks/Modals/AddTask";
  import TasksTodo from "components/Tasks/TasksTodo";
  import TasksCompleted from "components/Tasks/TasksCompleted";
  import NoTasks from "components/Tasks/NoTasks";
  import Search from "components/Tasks/Tools/Search";
  import Sort from "components/Tasks/Tools/Sort";


  export default {
    name: "PageTodo",

    components: {
      Sort,
      Search,
      NoTasks,
      TasksCompleted,
      TasksTodo,
      AddTask,
    },

    data() {
      return {
        showAddTask: false
      }
    },

    computed: {
      ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
      ...mapGetters("settings", ["settings"]),
      ...mapState("tasks", ["search"])
    },

    mounted() {
      this.$root.$on("showAddTask", () => {
        this.showAddTask = true;
      })
    }
  }
</script>

<style>
  .q-scroll-area-tasks {
    display: flex;
    flex-grow: 1;
  }
</style>

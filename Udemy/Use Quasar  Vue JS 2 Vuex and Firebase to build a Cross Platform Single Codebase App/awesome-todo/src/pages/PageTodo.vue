<template>
  <q-page class="q-pa-md">

    <!--No tasks-->
    <NoTasks v-if="!Object.keys(tasksTodo).length"/>

    <!--Not completed-->
    <TasksTodo v-else :tasksTodo="tasksTodo"/>

    <!--Completed-->
    <TasksCompleted
      v-if="Object.keys(tasksCompleted).length"
      :tasksCompleted="tasksCompleted"
    />

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTask = true"
        color="primary"
        size="24px"
        icon="add"
        round
      />
    </div>

    <q-dialog v-model="showAddTask">
      <AddTask @close="showAddTask = false"/>
    </q-dialog>

  </q-page>
</template>

<script>
  import {mapGetters} from "vuex";
  import AddTask from "components/Modals/AddTask";
  import TasksTodo from "components/Tasks/TasksTodo";
  import TasksCompleted from "components/Tasks/TasksCompleted";
  import NoTasks from "components/Tasks/NoTasks";


  export default {
    name: "PageTodo",

    components: {
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
      ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"])
    },

    mounted() {
      this.$root.$on("showAddTask", () => {
        this.showAddTask = true;
      })
    }
  }
</script>

<style>

</style>

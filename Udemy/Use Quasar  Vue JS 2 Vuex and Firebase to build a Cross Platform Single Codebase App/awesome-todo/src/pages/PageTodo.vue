<template>
  <q-page class="q-pa-md">
    <q-list v-if="Object.keys(tasks).length" bordered separator>
      <Task v-for="(task, key) in tasks"
            :task="task"
            :key="key"
            :id="key"/>
    </q-list>

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
  import Task from "components/Tasks/Task";
  import AddTask from "components/Modals/AddTask";


  export default {
    name: "PageTodo",
    components: {
      AddTask,
      Task
    },
    data() {
      return {
        showAddTask: true
      }
    },

    computed: {
      ...mapGetters("tasks", ["tasks"])
    }
  }
</script>

<style>

</style>

<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <ListHeader v-if="!settings.showTasksInOneList" bgColor="bg-orange-4">Todo</ListHeader>

      <q-list bordered separator>
        <Task
          v-for="(task, key) in tasksTodo"
          :task="task"
          :key="key"
          :id="key"
        />
      </q-list>
    </div>
  </transition>

</template>

<script>
  import {mapGetters} from "vuex";
  import Task from "components/Tasks/Task";
  import ListHeader from "components/Shared/ListHeader";


  export default {
    name: "TasksTodo",

    components: {
      ListHeader,
      Task
    },

    props: ["tasksTodo"],

    computed: {
      ...mapGetters("settings", ["settings"])
    }
  }
</script>

<style scoped>

</style>

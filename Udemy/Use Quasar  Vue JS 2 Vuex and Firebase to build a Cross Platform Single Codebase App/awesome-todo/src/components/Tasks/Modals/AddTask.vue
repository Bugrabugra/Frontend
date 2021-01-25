<template>
  <q-card>
    <ModalHeader>Add Task</ModalHeader>
    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <!--Name-->
        <ModalTaskName ref="modalTaskName" :name.sync="taskToSubmit.name"/>

        <!--Date-->
        <ModalDueDate :dueDate.sync="taskToSubmit.dueDate"/>

        <!--Time-->
        <ModalDueTime :dueDate="taskToSubmit.dueDate" :dueTime.sync="taskToSubmit.dueTime"/>
      </q-card-section>

      <!--Buttons-->
      <ModalButtons/>

    </q-form>
  </q-card>
</template>

<script>
  import {mapActions} from "vuex";
  import mixinAddEditTask from "src/mixins/mixin-add-edit-task";


  export default {
    name: "AddTask",

    mixins: [mixinAddEditTask],

    data() {
      return {
        taskToSubmit: {
          name: "",
          dueDate: "",
          dueTime: "",
          completed: false
        }
      }
    },

    methods: {
      ...mapActions("tasks", ["addTask"]),

      submitTask() {
        this.addTask(this.taskToSubmit);
        this.$emit("close");
      }
    }
  }
</script>

<style scoped>

</style>

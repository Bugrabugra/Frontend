<template>
  <q-card>
    <ModalHeader>Edit Task</ModalHeader>
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
    name: "EditTask",

    mixins: [mixinAddEditTask],

    props: ["task", "id"],

    data() {
      return {
        taskToSubmit: {}
      }
    },

    methods: {
      ...mapActions("tasks", ["updateTask"]),

      submitTask() {
        this.updateTask({
          id: this.id,
          updates: this.taskToSubmit
        })
        this.$emit("close");
      }
    },

    mounted() {
      this.taskToSubmit = Object.assign({}, this.task);
    }
  }
</script>

<style scoped>

</style>

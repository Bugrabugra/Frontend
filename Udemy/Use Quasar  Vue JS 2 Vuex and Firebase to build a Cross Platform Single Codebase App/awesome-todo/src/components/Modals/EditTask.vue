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
  import ModalHeader from "components/Modals/Shared/ModalHeader";
  import ModalTaskName from "components/Modals/Shared/ModalTaskName";
  import ModalDueDate from "components/Modals/Shared/ModalDueDate";
  import ModalDueTime from "components/Modals/Shared/ModalDueTime";
  import ModalButtons from "components/Modals/Shared/ModalButtons";


  export default {
    name: "EditTask",

    components: {
      ModalButtons,
      ModalDueTime,
      ModalDueDate,
      ModalTaskName,
      ModalHeader
    },

    props: ["task", "id"],

    data() {
      return {
        taskToSubmit: {}
      }
    },

    methods: {
      ...mapActions("tasks", ["updateTask"]),

      submitForm() {
        this.$refs.modalTaskName.$refs.name.validate();
        if (!this.$refs.modalTaskName.$refs.name.hasError) {
          this.submitTask();
        }
      },

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

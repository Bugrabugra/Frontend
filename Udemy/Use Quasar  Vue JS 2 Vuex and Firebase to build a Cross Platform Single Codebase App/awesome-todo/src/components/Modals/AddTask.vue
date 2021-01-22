<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Task</div>
      <q-space/>
      <q-btn
        v-close-popup
        icon="close"
        flat
        round
        dense
      />

    </q-card-section>

    <q-card-section>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consectetur consequatur cum dolor doloribus, eos error fugiat molestiae natus possimus quaerat quam quasi quibusdam repellat repudiandae rerum soluta sunt ullam.
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        flat
        label="Save"
        color="primary"
        v-close-popup
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
  export default {
    name: "AddTask",

    data() {
      return {
        taskToSubmit: {
          name: "",
          dueDate: "",
          dueTime: "",
          completed: false
        }
      }
    }
  }
</script>

<style scoped>

</style>

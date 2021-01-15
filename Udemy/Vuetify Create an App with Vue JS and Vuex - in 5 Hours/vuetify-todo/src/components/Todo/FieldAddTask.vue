<template>
  <v-text-field
      v-model="newTaskTitle"
      @keyup.enter="addTask"
      class="pa-3"
      label="Add Task"
      outlined
      hide-details
      clearable
  >
    <template v-slot:append>
      <v-icon
          @click="addTask"
          color="primary"
          :disabled="newTaskTitleInvalid"
      >
        mdi-plus
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
  export default {
    name: "FieldAddTask",

    data() {
      return {
        newTaskTitle: ""
      }
    },

    methods: {
      addTask() {
        if (!this.newTaskTitleInvalid) {
          this.$store.dispatch('addTask', this.newTaskTitle);
          this.newTaskTitle = "";
        }
      },
    },

    computed: {
      newTaskTitleInvalid() {
        return !this.newTaskTitle;
      }
    }
  }
</script>

<style scoped>

</style>
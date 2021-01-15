<template>
  <v-text-field
      v-model="newTaskTitle"
      @keyup.enter="addTask"
      class="pa-3 field-add-task"
      placeholder="Add Task"
      outlined
      hide-details
      clearable
  >
    <template v-slot:append>
      <v-icon
          @click="addTask"
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

<style lang="sass">
  .field-add-task.v-input--is-focused
    .v-input__slot
      background: rgba(31, 94, 129, 0.5) !important
</style>
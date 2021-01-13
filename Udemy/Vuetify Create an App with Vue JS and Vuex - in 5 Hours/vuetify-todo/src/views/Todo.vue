<template>
  <div class="home">
    <v-text-field
        v-model="newTaskTitle"
        @click:append="addTask"
        @keyup.enter="addTask"
        class="pa-3"
        label="Add Task"
        append-icon="mdi-plus"
        outlined
        hide-details
        clearable
    >

    </v-text-field>

    <v-list
        v-if="$store.state.tasks.length"
        class="pt-0"
        flat
    >
      <div v-for="task in $store.state.tasks" :key="task.id">
        <v-list-item
            @click="$store.commit('doneTask', task.id)"
            :class="{'blue lighten-4': task.done}"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title :class="{'text-decoration-line-through': task.done}">{{task.title}}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                  icon
                  @click.stop="$store.commit('deleteTask', task.id)"
              >
                <v-icon color="primary">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>

          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>

    <div v-else class="no-tasks">
      <v-icon size="100" color="primary">
        mdi-check
      </v-icon>
      <div class="text-h5 primary--text">
        No tasks
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Todo',
    data() {
      return {
        newTaskTitle: ""
      }
    },

    methods: {
      addTask() {
        this.$store.commit('addTask', this.newTaskTitle);
        this.newTaskTitle = "";
      },
    }

  }
</script>

<style lang="sass">
  .no-tasks
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    opacity: 0.5
</style>

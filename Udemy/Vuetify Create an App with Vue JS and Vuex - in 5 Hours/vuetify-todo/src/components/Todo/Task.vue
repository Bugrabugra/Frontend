<template>
  <div>
    <v-list-item
        @click="$store.commit('doneTask', task.id)"
        :class="{'blue lighten-4': task.done}"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
              :class="{'text-decoration-line-through': task.done}"
          >{{task.title}}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action v-if="task.dueDate">
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon>
            {{task.dueDate | niceDate}}
          </v-list-item-action-text>
        </v-list-item-action>

        <v-list-item-action>
          <TaskMenu :task="task"/>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>

  </div>
</template>

<script>
  import TaskMenu from "./TaskMenu";
  import {format} from "date-fns";


  export default {
    name: "Task",

    components: {
      TaskMenu,
    },

    props: ["task"],

    filters: {
      niceDate(value) {
        return format(new Date(value), "MMM d");
      }
    }

  }
</script>

<style scoped>

</style>
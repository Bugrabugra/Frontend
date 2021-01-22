<template>
  <q-item @click="updateTask({id: id, updates: {completed: !task.completed}})"
          :class="!task.completed ? 'bg-orange-3' : 'bg-green-3'"
          clickable
          v-ripple>
    <q-item-section side top>
      <q-checkbox :value="task.completed"
                  class="no-pointer-events"/>
    </q-item-section>

    <q-item-section>
      <q-item-label :class="{'text-strikethrough' : task.completed}">{{task.name}}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <div class="column justify-center">
          <q-icon
            size="18px"
            name="event"
            class="q-mr-xs"/>
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">
            {{task.dueDate}}
          </q-item-label>
          <q-item-label caption class="row justify-end">
            <small>{{task.dueTime}}</small>
          </q-item-label>
        </div>
      </div>

    </q-item-section>

    <q-item-section side>
      <q-btn
        @click.stop="promptToDelete(id)"
        flat
        dense
        round
        color="red"
        icon="delete"></q-btn>
    </q-item-section>
  </q-item>

</template>

<script>
  import {mapActions} from "vuex";


  export default {
    name: "Task",

    data() {
      return {}
    },

    props: ["task", "id"],

    methods: {
      ...mapActions("tasks", ["updateTask", "deleteTask"]),

      promptToDelete(id) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Really delete?',
          ok: {
            push: true
          },
          cancel: {
            color: "negative"
          },
          persistent: true
        }).onOk(() => {
          this.deleteTask(id);
        })
      }
    }
  }
</script>

<style scoped>

</style>

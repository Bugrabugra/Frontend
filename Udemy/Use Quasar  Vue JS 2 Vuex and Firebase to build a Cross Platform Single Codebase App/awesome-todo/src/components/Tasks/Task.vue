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

    <q-item-section v-if="task.dueDate" side>
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
      <div class="row">
        <q-btn
          @click.stop="showEditTask = true"
          flat
          dense
          round
          color="primary"
          icon="edit">
        </q-btn>

        <q-btn
          @click.stop="promptToDelete(id)"
          flat
          dense
          round
          color="red"
          icon="delete">
        </q-btn>
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <EditTask :id="id" :task="task" @close="showEditTask = false"/>
    </q-dialog>

  </q-item>
</template>

<script>
  import {mapActions} from "vuex";
  import EditTask from "components/Modals/EditTask";


  export default {
    name: "Task",

    components: {EditTask},

    data() {
      return {
        showEditTask: false
      }
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

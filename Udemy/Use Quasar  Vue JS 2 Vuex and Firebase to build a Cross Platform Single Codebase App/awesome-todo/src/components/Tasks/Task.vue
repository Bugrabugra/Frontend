<template>
  <q-item
    @click="updateTask({id: id, updates: {completed: !task.completed}})"
    :class="!task.completed ? 'bg-orange-3' : 'bg-green-3'"
    v-touch-hold:1000.mouse="showEditTaskModal"
    clickable
    v-ripple
  >
    <q-item-section side top>
      <q-checkbox :value="task.completed"
                  class="no-pointer-events"/>
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{'text-strikethrough' : task.completed}"
        v-html="$options.filters.searchHighlight(task.name, search)"
      />
    </q-item-section>

    <q-item-section v-if="task.dueDate" side>
      <div class="row">
        <div class="column justify-center">
          <q-icon
            size="18px"
            name="event"
            class="q-mr-xs"
          />
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">
            {{task.dueDate | niceDate}}
          </q-item-label>
          <q-item-label caption class="row justify-end">
            <small>{{taskDueTime}}</small>
          </q-item-label>
        </div>
      </div>

    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTaskModal"
          color="primary"
          icon="edit"
          flat
          dense
          round
        >
        </q-btn>

        <q-btn
          @click.stop="promptToDelete(id)"
          color="red"
          icon="delete"
          flat
          dense
          round
        >
        </q-btn>
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <EditTask :id="id" :task="task" @close="showEditTask = false"/>
    </q-dialog>

  </q-item>
</template>

<script>
  import {mapActions, mapState, mapGetters} from "vuex";
  import EditTask from "components/Tasks/Modals/EditTask";
  import {date} from "quasar";
  const {formatDate} = date;


  export default {
    name: "Task",

    components: {EditTask},

    data() {
      return {
        showEditTask: false
      }
    },

    computed: {
      ...mapState("tasks", ["search"]),
      ...mapGetters("settings", ["settings"]),

      taskDueTime() {
        if (this.settings.show12HourTimeFormat) {
          return date.formatDate(this.task.dueDate + " " + this.task.dueTime, "h:mmA")
        }
        return this.task.dueTime;
      }
    },

    filters: {
      niceDate(value) {
        return formatDate(value, "D-MMM");
      },

      searchHighlight(value, search) {
        if (search) {
          let searchRegEx = new RegExp(search, "ig");
          return value.replace(
            searchRegEx,
            match => {
              return "<span class='bg-yellow-6'>" + match + "</span>"
            }
          );
        }
       return value;
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
      },

      showEditTaskModal() {
        this.showEditTask = true;
      }
    }
  }
</script>

<style scoped>

</style>

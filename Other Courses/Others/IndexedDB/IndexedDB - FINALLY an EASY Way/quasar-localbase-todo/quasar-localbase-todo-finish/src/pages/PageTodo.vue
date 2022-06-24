<template>
  <q-page>
    <q-input
      v-model="newTask"
      @keyup.enter="addNewTask"
      placeholder="Add new task"
      filled
    >
      <template v-slot:append>
        <q-btn
          @click="addNewTask"
          icon="add"
          dense
          flat
          round
        />
      </template>
    </q-input>
    
    <q-list separator>
      <q-item
        v-for="task in tasks"
        :key="task.date"
        @click="toggleDone(task.id)"
        :class="{ 'bg-teal-1' : task.done }"
        class="cursor-pointer"
        v-ripple
        clickable
      >
        <q-item-section side top>
          <q-checkbox v-model="task.done" class="no-pointer-events" />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{ 'text-strike' : task.done }">
            {{ task.name }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label caption>{{ task.id | niceDate }}</q-item-label>
        </q-item-section>

        <q-item-section
          v-if="task.done"
          side
        >
          <q-btn
            @click.stop="deleteTask(task.id)"
            :disable="!task.done"
            icon="delete"
            color="primary"
            size="12px"
            dense
            flat
            round
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import Localbase from 'localbase'

let db = new Localbase('db')

export default {
  name: 'PageTodo',
  data() {
    return {
      newTask: '',
      tasks: [
        // {
        //   id: 1599562536409,
        //   name: 'Wake up',
        //   done: false
        // }
      ]
    }
  },
  methods: {
    addNewTask() {
      let newTask = {
        id: Date.now(),
        name: this.newTask,
        done: false
      }
      db.collection('tasks').add(newTask)
      this.tasks.push(newTask)
      this.newTask = ''
    },
    toggleDone(id) {
      let task = this.tasks.find(task => task.id === id)
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      })
      task.done = !task.done
    },
    deleteTask(id) {
      let index = this.tasks.findIndex(task => task.id === id)
      db.collection('tasks').doc({ id: id }).delete()
      this.tasks.splice(index, 1)
    },
    getTasks() {
      db.collection('tasks').get().then(tasks => {
        this.tasks = tasks
      })
    }
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMM Do h:ssA')
    }
  },
  created() {
    this.getTasks()
  }
}
</script>

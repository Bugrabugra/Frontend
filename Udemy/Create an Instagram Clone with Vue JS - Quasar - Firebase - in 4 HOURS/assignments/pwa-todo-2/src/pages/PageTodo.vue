<template>
  <q-page>
    <q-input
      v-model="newTask"
      placeholder="Add task"
      @keyup.enter="addTask"
      class="bg-cyan-8"
      dark
      filled
      square
    >
      <template v-slot:append>
        <q-btn
          @click="addTask"
          icon="add"
          round
          dense
          flat
        />
      </template>
    </q-input>

    <q-list
      bordered
      separator
    >
      <q-item
        v-for="task in tasks"
        :key="task.id"
        class="bg-cyan-1"
      >
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>

      </q-item>

    </q-list>
  </q-page>
</template>

<script>
let qs = require('qs')

export default {
  name: 'PageTodo',
  data() {
    return {
      newTask: '',
      tasks: [
        // {
        //   id: 1593467150887,
        //   title: 'Do this'
        // },
        // {
        //   id: 1593467166614,
        //   title: 'Do that'
        // }
      ]
    }
  },
  methods: {
    getTasks() {
      this.$q.loading.show()
      this.$axios.get('http://localhost:3000/tasks').then(response => {
        console.log('response: ', response)
        this.tasks = response.data
        this.$q.loading.hide()
      })
    },
    addTask() {
      this.$q.loading.show()
      let newTask = {
        id: Date.now(),
        title: this.newTask
      }
      let newTaskQS = qs.stringify(newTask)
      this.$axios.post(`http://localhost:3000/createTask?${ newTaskQS }`)
        .then(response => {
          this.tasks.push(newTask)
          this.$q.loading.hide()
      }).catch(error => {
        if (!navigator.onLine) {
          this.$q.notify("Post created offline");
          this.$q.loading.hide();
        }
      })
      this.newTask = ''
    }
  },
  created() {
    this.getTasks()
  }
}
</script>

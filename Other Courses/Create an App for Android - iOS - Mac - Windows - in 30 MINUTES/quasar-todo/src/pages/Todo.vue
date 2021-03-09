<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        @keyup.enter="addTask"
        class="col"
        v-model="newTask"
        bg-color="white"
        placeholder="Add Task"
        dense
        filled
        square
      >
        <template v-slot:append>
          <q-btn icon="add" @click="addTask" round dense flat></q-btn>
        </template>
      </q-input>
    </div>

    <q-list
      class="bg-white"
      separator
      bordered
    >
      <q-item
        v-for="(task, index) in tasks"
        :key="task.title"
        @click="task.done = !task.done"
        :class="{'done bg-blue-1': task.done}"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="task.done"
            color="primary"
            class="no-pointer-events"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{task.title}}</q-item-label>
        </q-item-section>

        <q-item-section
          v-if="task.done"
          side
        >
          <q-btn
            @click.stop="deleteTask(index)"
            color="primary"
            icon="delete"
            flat
            round
            dense
          />
        </q-item-section>

      </q-item>
    </q-list>

    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon
        name="check"
        size="100px"
        color="primary"
      />
      <div class="text-h5 text-primary text-center">
        No tasks
      </div>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  data() {
    return {
      tasks: [
        {title: "Get bananas", done: false},
        {title: "Eat bananas", done: true},
        {title: "Poo bananas", done: false}
      ],
      newTask: ""
    }
  },

  methods: {
    deleteTask(index) {
      this.$q.dialog({
        title: "Confirm",
        message: "Really delete?",
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.tasks.splice(index, 1);
        this.$q.notify("Task deleted");
      })
    },

    addTask() {
      const task = {
        title: this.newTask,
        done: false
      }
      this.tasks.push(task);
      this.newTask = "";
    }
  }
}
</script>

<style lang="scss">
  .done {
    .q-item__label {
      text-decoration: line-through;
      color: #bbb;
    }
  }

  .no-tasks {
    opacity: 0.5;
  }
</style>

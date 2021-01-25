<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-banner class="bg-grey-4 rounded-borders">
      <template v-slot:avatar>
        <q-icon name="check" color="primary"/>
        No tasks to do today!
      </template>

      <template v-slot:action>
        <q-btn
          @click="$root.$emit('showAddTask')"
          color="primary"
          label="Add Task"
          flat
        />
      </template>
    </q-banner>
  </transition>
</template>

<script>
  export default {
    name: "NoTasks"
  }
</script>

<style scoped>
  .rounded-borders {
    border-radius: 10px;
  }
</style>

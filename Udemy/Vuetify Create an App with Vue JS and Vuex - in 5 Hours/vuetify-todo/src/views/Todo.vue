<template>
  <div class="home">
    <ListTasks v-if="$store.state.tasks.length"/>
    <NoTasks v-else/>
    <ButtonDoneSorting v-if="$store.state.sorting"/>
  </div>
</template>

<script>
  import FieldAddTask from "../components/Todo/FieldAddTask";
  import ListTasks from "../components/Todo/ListTasks";
  import NoTasks from "../components/Todo/NoTasks";
  import ButtonDoneSorting from "../components/Todo/ButtonDoneSorting";
  export default {
    name: 'Todo',

    components: {
      ButtonDoneSorting,
      NoTasks,
      ListTasks,
    },
  }
</script>

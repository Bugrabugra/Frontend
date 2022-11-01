<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newTask" placeholder="I need to..." type="text">
    <button>Add</button>
  </form>
</template>

<script>
  import { useTaskStore } from "@/stores/TaskStore";
  import { ref } from "vue";


  export default {
    name: "TaskForm",
    setup() {
      const taskStore = useTaskStore();
      const newTask = ref("");

      const handleSubmit = () => {
        if (newTask.value.length > 0) {
          taskStore.addTask({
            title: newTask.value,
            isFav: false,
            id: Math.floor(Math.random() * 10000)
          });

          newTask.value = "";
        }
      };

      return { handleSubmit, newTask }
    }
  }
</script>

<style scoped>

</style>

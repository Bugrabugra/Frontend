<template>
  <div>
    <label for="showDone">
      <input type="checkbox" name="showDone" id="showDone" v-model="showDone">
      Show done
    </label>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <p :class="(task.done ? 'done' : '')">{{task.task}}</p>
        <div class="remove">x</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import {computed, ref} from "vue";
  import {useStore} from "vuex";

  const store = useStore();
  const showDone = ref("");
  defineProps(["showDone"]);
  const tasks = computed(() => store.state.tasks);
</script>

<style scoped>
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 14px;
    text-transform: uppercase;
    padding: 15px;
    border-bottom: 1px dashed #888;
  }

  label input {
    margin-right: 5px;
  }

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  ul li {
    display: flex;
    padding: 15px;
    border-bottom: 1px dashed #aaa;
    justify-content: space-between;
    align-items: center;
  }

  ul li p {
    margin: 0;
    color: #171717;
    font-weight: 300;
    text-transform: uppercase;
  }

  ul li p.done {
    text-decoration: line-through;
  }

  ul li p.remove {
    color: #af1e2d;
    font-weight: 300;
    font-size: 20px;
  }
</style>
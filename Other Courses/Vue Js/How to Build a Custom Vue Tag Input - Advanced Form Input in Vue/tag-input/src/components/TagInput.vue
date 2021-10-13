<template>
  <div class="tag-input">
    <transition-group name="fade">
        <div
            v-for="(tag, index) in tags"
            :key="tag"
            class="tag-input__tag"
        >
          <span @click="removeTag(index)">x</span>
          {{tag}}
        </div>
    </transition-group>

    <input
        type="text"
        placeholder="Enter a Tag"
        class="tag-input__text"
        @keydown="addTag"
        @keydown.delete="removeLastTag"
    >
  </div>
</template>

<script setup>
  import {ref} from "vue";

  const tags = ref(["hello", "world"]);

  const addTag = (event) => {
    if (event.code === "Backslash" || event.code === "Enter") {
      event.preventDefault();
      const val = event.target.value.trim();

      if (val.length > 0) {
        tags.value.push(val);
        event.target.value = "";
      }
    }
  };

  const removeTag = (index) => {
    tags.value.splice(index, 1);
  };

  const removeLastTag = (event) => {
    if (event.target.value.length === 0) {
      tags.value.pop();
    }
  };
</script>

<style scoped>
  .tag-input {
    width: 100%;
    border: 1px solid #eee;
    font-size: 0.9em;
    height: 50px;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .tag-input__tag {
    height: 30px;
    float: left;
    margin-right: 10px;
    background-color: #eee;
    margin-top: 10px;
    line-height: 30px;
    padding: 0 5px;
    border-radius: 5px;
  }

  .tag-input__tag > span {
    cursor: pointer;
    opacity: 0.75;
  }

  .tag-input__text {
    border: none;
    outline: none;
    font-size: 0.9em;
    line-height: 50px;
    background: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
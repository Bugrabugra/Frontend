<template>
  <button
      :style="{background: background, color: color}"
      :class="{'disabled-button': disabled}"
  >
    Button
  </button>
</template>

<script>
  export default {
    name: "MyButton",
    props: {
      color: {
        type: String
      },
      background: {
        type: String
      },
      disabled: {
        type: Boolean
      }
    }
  }
</script>

<style scoped>
  button {
    background: none;
    color: black;
    border: none;
    border-radius: 5px;
    padding: 10px 40px;
    font-size: 16px;
    cursor: pointer;
  }

  .disabled-button {
    opacity: 0.5;
  }

  button:disabled {
    opacity: 0.5;
  }

  button:hover {
    filter: brightness(125%);
  }
</style>
<template>
  <div class="grid">
    <div
        class="grid-item"
        v-for="(block, index) in blocks"
        :key="index"
        :style="'background-color:' + block.color"
        @click="setBlockColor(index)"
    >

    </div>
  </div>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: "ColorGrid",
    props: ["color"],
    setup(props) {
      const blocks = ref([]);
      const gridSize = ref(100);

      const initGrid = () => {
        for (let i = 0; i < gridSize.value; i++) {
          blocks.value.push({
            color: "#fff"
          })
        }
      };

      initGrid();

      const setBlockColor = (i) => {
        blocks.value[i].color = props.color;
      };

      return {blocks, setBlockColor}
    }
  }
</script>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    width: 320px;
    height: 320px;
    margin: 0 auto;

    .grid-item {
      border: 1px dashed #171717;
    }
  }
</style>
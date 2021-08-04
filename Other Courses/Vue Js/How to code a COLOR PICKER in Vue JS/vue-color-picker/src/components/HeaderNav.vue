<template>
  <header>
    <h3>Color<span>Picker</span></h3>
    <div class="color" :style="'background-color:' + color">

    </div>
  </header>
</template>

<script>
  export default {
    name: "Header",
    props: ["color"]
  }
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: #171717;
    padding: 0 15px;
  }

  h3 {
    color: #f3f3f3;
    font-size: 28px;
    font-weight: 300;
    text-transform: uppercase;

    span {
      color: #ffce00;
      font-weight: 900;
    }
  }

  .color {
    width: 25px;
    height: 25px;
    border: 1px dashed #f3f3f3;
  }
</style>
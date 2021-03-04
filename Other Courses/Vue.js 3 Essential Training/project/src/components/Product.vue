<template>
  <div class="col-2 m-auto">
    <button
        @click="this.$parent.$parent.$parent.$parent.$emit('addItem', item)"
        class="btn btn-success"
    >
      +
    </button>
  </div>

  <div class="col-sm-4">
    <img :src="item.image" :alt="item.name" class="img-fluid d-block">
  </div>

  <div class="col">
    <h3 class="text-primary">{{item.name}}</h3>
    <p class="mb-0">{{item.description}}</p>

    <div class="h5 float-right">
      <span class="label"></span>
      <Curr :amt="item.price"/>
    </div>
  </div>
</template>

<script>
  import Curr from "./Curr";
  export default {
    name: "Product",

    components: {Curr},

    props: ["item"],

    emits: ["addItem"]
  }
</script>
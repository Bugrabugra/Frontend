<template>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a href="javascript:void(0)" class="page-link" @click="previous">Previous</a>
      </li>

      <li class="page-item">
        <a href="javascript:void(0)" class="page-link" @click="next">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: "Paginator",

    emits: ["page-changed"],

    props: {
      lastPage: Number
    },

    setup(props, context) {
      const page = ref(1);

      const next = async () => {
        if (page.value === props.lastPage) {
          return
        }
        page.value++;
        context.emit("page-changed", page.value);
      };

      const previous = async () => {
        if (page.value === 1) {
          return
        }
        page.value--;
        context.emit("page-changed", page.value);
      };

      return {next, previous}
    }
  }
</script>
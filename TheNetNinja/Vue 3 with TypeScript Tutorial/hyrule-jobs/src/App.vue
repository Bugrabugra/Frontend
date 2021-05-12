<template>
  <div class="app">
    <!--<p>{{name}} - {{age}}</p>-->
    <!--<button @click="changeName('Zelda')">change name</button>-->
    <!--<button @click="changeAge(30)">change age</button>-->
    <header>
      <div class="title">
        <img src="./assets/heart.svg" alt="site logo">
        <h1>Hyrule Jobs</h1>
      </div>

      <div class="order">
        <button @click="handleClick('title')">order by title</button>
        <button @click="handleClick('salary')">order by salary</button>
        <button @click="handleClick('location')">order by location</button>
      </div>
    </header>

    <JobsList :jobs="jobs" :order="order"/>
  </div>
</template>

<script lang="ts">
  import {defineComponent, reactive, ref, toRefs} from 'vue';
  import Job from "@/types/Job";
  import JobsList from "@/components/JobsList.vue";
  import OrderTerm from "@/types/OrderTerm";

  export default defineComponent({
    name: 'App',

    components: {JobsList},

    setup() {
      // **************** Method 1 *********************
      // const state = reactive({
      //   name: "Link",
      //   age: 25 as string | number
      // })
      //
      // return {...toRefs(state)}

      // **************** Method 2 *********************
      // const name = ref("Link");
      // const age = ref<number | string>(25);
      //
      // return {name, age}

      // *************************************

      const jobs = ref<Job[]>([
        {
          title: "farm worker",
          location: "lon lon ranch",
          salary: 30000,
          id: "1"
        },
        {
          title: "quarryman",
          location: "death mountain",
          salary: 40000,
          id: "2"
        },
        {
          title: "flute player",
          location: "the lost woods",
          salary: 35000,
          id: "3"
        },
        {
          title: "fisherman",
          location: "lake hylia",
          salary: 21000,
          id: "4"
        },
        {
          title: "prison guard",
          location: "gerudo valley",
          salary: 32000,
          id: "5"
        }
      ])

      const order = ref<OrderTerm>("title");

      const handleClick = (term: OrderTerm) => {
        order.value = term;
      }

      return {jobs, handleClick, order}
    },

  });
</script>

<style>
  header {
    text-align: center;
  }

  header .order {
    margin-top: 20px;
  }

  button {
    margin: 0 10px;
    color: #1195c9;
    border: 3px solid #1195c9;
    background: #d5f0ff;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }

  header .title {
    display: flex;
    justify-content: center;
  }

  header img {
    width: 60px;
    margin-right: 20px;
  }

  header h1 {
    font-size: 3em;
  }
</style>
<template>
  <div class="home">
    <h1>Home</h1>
    <h2>Refs</h2>
    <!--<p ref="p">My name is {{name}} and my age is {{age}}</p>-->
    <p>My name is {{name}} and my age is {{age}}</p>
    <button @click="handleClick">click me</button>
    <button @click="age++">add 1 to age</button>
    <input type="text" v-model="name">

    <hr>

    <p>{{ninjaOne.name}} - {{ninjaOne.age}}</p>
    <button @click="updateNinjaOne">Update ninja one</button>

    <hr>

    <h2>Reactive</h2>
    <p>{{ninjaTwo.name}} - {{ninjaTwo.age}}</p>
    <button @click="updateNinjaTwo">Update ninja two</button>

    <hr>
    <h2>Computed</h2>
    <input type="text" v-model="search">
    <p>search term - {{search}}</p>
    <div v-for="name in matchingNames" :key="name">{{name}}</div>

    <hr>
    <button @click="handleClick2">Stop watch</button>

    <hr>
    <PostList :posts="posts" v-if="showPosts"/>
    <button @click="showPosts = !showPosts">toggle posts</button>
    <button @click="posts.pop()">delete a post</button>
  </div>
</template>

<script>
  import {ref, reactive, computed, watch, watchEffect} from "vue";
  import PostList from "../components/PostList";


  export default {
    name: 'Home',
    components: {PostList},
    setup() {
      // const p = ref(null)

      // let name = "mario";
      // let age = 30;

      const name = ref("mario");
      const age = ref(30);

      const handleClick = () => {
        // console.log(p, p.value);
        // p.value.classList.add("test");
        // p.value.textContent = "hello ninjas"
        name.value = "luigi";
        age.value = 40;
      }

      // *****************************************


      const ninjaOne = ref({name: "mario", age: 30});

      const updateNinjaOne = () => {
        ninjaOne.value.age = 40;
      }

      const ninjaTwo = reactive({name: "luigi", age: 35});

      const updateNinjaTwo = () => {
        ninjaTwo.age = 55;
      }

      // *****************************************

      const names = ref(["mario", "luigi", "toad", "bowser", "koopa", "peach"]);
      const search = ref("");
      const matchingNames = computed(() => {
        return names.value.filter(name => {
          return name.match(search.value);
        })
      })

      // *****************************************
      const stopWatch = watch(search, () => {
        console.log(search.value);
      })

      const stopWatchEffect = watchEffect(() => {
        console.log("watch effect run", search.value);
      })

      const handleClick2 = () => {
        stopWatch();
        stopWatchEffect();
      }

      // *****************************************
      const posts = ref([
        {title: "welcome to the blog", body: "lorem ipsum", id: 1},
        {title: "top 5 CSS tips", body: "lorem", id: 2}
      ])

      // *****************************************
      const showPosts = ref(true);

      return {
        name, age, handleClick,
        ninjaOne, updateNinjaOne,
        ninjaTwo, updateNinjaTwo,
        names, search, matchingNames,
        stopWatch, stopWatchEffect, handleClick2,
        posts,
        showPosts
      };
    },
  }
</script>

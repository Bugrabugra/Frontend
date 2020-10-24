<template>
  <div id="app">
    <h1>{{title}}</h1>
    <Navbar/>
    <AllFriends v-bind:friends="friends" v-on:deleteEvent="deleteFriend"/>
    <OnlineFriends v-bind:friends="friends"/>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";
  import AllFriends from "./components/AllFriends";
  import OnlineFriends from "./components/OnlineFriends";


  export default {
    name: 'app',
    components: {
      Navbar: Navbar,
      AllFriends: AllFriends,
      OnlineFriends: OnlineFriends
    },
    data() {
      return {
        title: "My first Vue app, woooo =)",
        friends: [
          {name: "Mario", online: true},
          {name: "Luigi", online: false},
          {name: "Toad", online: true},
          {name: "Bowser", online: false}
        ]
      }
    },
    methods: {
      deleteFriend(payload) {
        console.log(payload);
        this.friends = this.friends.filter(friend => {
          return friend.name !== payload.name;
        })
      }
    }
  }
</script>

<style>
  h1 {
    color: #444;
    font-weight: normal;
    text-align: center;
  }
</style>

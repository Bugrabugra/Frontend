<template>
  <div id="all-friends">
    <h2>All friends</h2>
    <div v-for="(friend, index) in friends" v-bind:key="index">
      <span v-on:click="unfriend(friend.name)">{{friend.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AllFriends",
    props: ["friends"],
    data() {
      return {

      }
    },
    methods: {
      unfriend(name) {
        this.$emit("deleteEvent", {name: name})
      }
    }
  }
</script>

<style scoped>

</style>

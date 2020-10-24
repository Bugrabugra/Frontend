<template>
  <div id="online-friends">
    <h2>Online friends</h2>
    <div v-for="(friend, index) in friends" v-bind:key="index">
      <span v-if="friend.online">{{friend.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OnlineFriends",
    props: ["friends"],
    data() {
      return {

      }
    }
  }
</script>

<style scoped>

</style>

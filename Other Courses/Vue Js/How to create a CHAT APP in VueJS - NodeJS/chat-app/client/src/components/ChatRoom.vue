<template>
  <div class="chat-window">
    <div class="messages">
      <div class="message" v-for="message in messages" :key="message._id">
        <div class="username">{{message.username}}</div>
        <div class="message-text">{{message.msg}}</div>
      </div>
    </div>

    <form class="input-container" @submit="sendMessage">
      <input type="text" v-model="msg">
      <button @click="sendMessage" :disabled="!msg">Send</button>
    </form>
  </div>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: "ChatRoom",
    props: ["messages"],
    setup(_, {emit}) {
      // References
      const msg = ref("");

      // Methods
      const sendMessage = () => {
        if (!msg.value) {
          alert("Please enter a message");
          return;
        }
        emit("sendMessage", msg.value);
        msg.value = "";
      };

      return {msg, sendMessage}
    }
  }
</script>

<style lang="scss" scoped>
  .chat-window {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.15);

    .messages {
      flex: 1;
      overflow: scroll;

      .message {
        display: flex;
        border-bottom: 1px solid #efefef;
        padding: 10px;

        &:last-of-type {
          border-bottom: none;
        }

        .username {
          width: 100px;
          margin-right: 15px;
        }

        .message-text {
          flex: 1;
        }
      }
    }

    .input-container {
      display: flex;

      input {
        flex: 1;
        height: 35px;
        font-size: 18px;
        box-sizing: border-box;
      }

      button {
        width: 75px;
        height: 35px;
        box-sizing: border-box;
      }
    }
  }
</style>
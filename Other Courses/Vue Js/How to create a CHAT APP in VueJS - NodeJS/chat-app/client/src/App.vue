<template>
  <div id="app">
    <div class="header">
      <h1>Chatroom</h1>
      <p class="username">Username: {{username}}</p>
      <p class="online">Online: {{users.length}}</p>
    </div>
    <ChatRoom :messages="messages" @sendMessage="sendMessage"/>
  </div>
</template>

<script>
  import {ref, onMounted} from "vue";
  import io from "socket.io-client";
  import ChatRoom from "./components/ChatRoom";


  export default {
    name: 'App',
    components: {ChatRoom},
    setup() {
      // References
      const username = ref("");
      const socket = io("http://localhost:3000");
      const messages = ref([]);
      const users = ref([]);

      // Methods
      const joinServer = () => {
        socket.on("loggedIn", data => {
          messages.value = data.messages;
          users.value = data.users;
          socket.emit("newUser", username.value);
        });

        listen();
      };

      const listen = () => {
        // Join
        socket.on("userOnline", user => {
          users.value.push(user);
        });

        // Leave
        socket.on("userLeft", user => {
          users.value.splice(users.value.indexOf(user), 1);
        });

        // Message
        socket.on("msg", message => {
          messages.value.push(message);
        })
      };

      const sendMessage = (message) => {
        socket.emit("msg", message);
      };

      // Mount
      onMounted(() => {
        username.value = prompt("What is your username?", "Anonymous");
        if (!username.value) {
          username.value = "Anonymous";
        }

        joinServer();
      });

      return {username, users, messages, sendMessage}
    }
  }
</script>

<style lang="scss">
  body {
    @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
    font-family: 'Varela Round', sans-serif;
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }

  #app {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding: 15px;
  }
</style>

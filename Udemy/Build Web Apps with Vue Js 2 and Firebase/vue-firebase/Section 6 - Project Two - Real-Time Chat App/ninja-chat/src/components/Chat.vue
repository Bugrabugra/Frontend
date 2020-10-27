<template>
  <div class="chat container">
    <h2 class="center teal-text">Ninja Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" v-bind:key="message.id">
            <span class="teal-text">{{message.name}}</span>
            <span class="grey-text text-darken-3">{{message.content}}</span>
            <span class="grey-text time">{{message.timestamp}}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage v-bind:name="name"/>
      </div>
    </div>
  </div>
</template>

<script>
  import NewMessage from "./NewMessage";
  import db from "../firebase/init";
  import moment from "moment";


  export default {
    name: "Chat",
    props: ["name"],
    components: {
      "NewMessage": NewMessage
    },
    data() {
      return {
        messages: []
      }
    },
    created() {
      const shuffleWords = (sentence) => {
        String.prototype.shuffleLetters = function () {
          let a = this.split("")
          let n = a.length;

          for(let i = n - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
          }
          return a.join("");
        }
        const newSentence = []
        sentence.split(" ").forEach(word => {
          newSentence.push(word.shuffleLetters());
        });
        return newSentence.join(" ");
      }


      let ref = db.collection("messages").orderBy("timestamp");
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            let doc = change.doc;
            this.messages.push({
              id: doc.id,
              name: doc.data().name,
              content: shuffleWords(doc.data().content),
              timestamp: moment(doc.data().timestamp).format("lll")
            })
          }
        })
      })
    }
  }
</script>

<style scoped>
  .chat h2{
    font-size: 2.6em;
    margin-bottom: 40px;
  }

  .chat span {
    font-size: 1.4em;
  }

  .chat .time {
    display: block;
    font-size: 0.8em;
  }

  .messages {
    max-height: 300px;
    overflow: auto;
  }

  .messages::-webkit-scrollbar {
    width: 3px;
  }

  .messages::-webkit-scrollbar-track {
       background: #ddd;
  }

  .messages::-webkit-scrollbar-thumb {
    background: #aaa;
  }

</style>

<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{profile.alias}}'s Wall</h2>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" v-bind:key="index">
          <div class="deep-purple-text">{{comment.from}}</div>
          <div class="grey-text text-darken-2">{{comment.content}}</div>
        </li>
      </ul>
      <form v-on:submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" id="comment" v-model="newComment">
          <p v-if="feedback" class="red-text center">{{feedback}}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import db from "../../firebase/init";
  import firebase from "firebase";


  export default {
    name: "ViewProfile",
    data() {
      return {
        profile: null,
        newComment: null,
        feedback: null,
        user: null,
        comments: []
      }
    },
    created() {
      let ref = db.collection("users");

      // Get current user
      ref.where("user_id", "==", firebase.auth().currentUser.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.user = doc.data();
          this.user.id = doc.id;
        })
      })

      // Profile data
      ref.doc(this.$route.params.id).get().then(user => {
        this.profile = user.data();
      })

      // Comments
      db.collection("comments")
        .where("to", "==", this.$route.params.id)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              this.comments.unshift({
                from: change.doc.data().from,
                content: change.doc.data().content
              })
            }
          })
        })
    },
    methods: {
      addComment() {
        if (this.newComment) {
          this.feedback = null;
          db.collection("comments").add({
            to: this.$route.params.id,
            from: this.user.id,
            content: this.newComment,
            time: Date.now()
          }).then(() => {
            this.newComment = null;
          })
        }
      }
    }
  }
</script>

<style scoped>
  .view-profile .card {
    padding: 20px;
    margin-top: 60px;
  }

  .view-profile h2 {
    font-size: 2em;
    margin-top: 0;
  }

  .view-profile li {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
</style>

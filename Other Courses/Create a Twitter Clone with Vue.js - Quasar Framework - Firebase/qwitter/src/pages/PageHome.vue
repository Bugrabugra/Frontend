<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-sm">
        <div class="col">
          <q-input
            v-model="newQweetContent"
            placeholder="What's happening?"
            maxlength="280"
            class="new-qweet"
            counter
            bottom-slots
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://s.gravatar.com/avatar/14ac8ac4dcdf328eae27da2eff4b4b9d?s=80">
              </q-avatar>
            </template>
          </q-input>
        </div>

        <div class="col col-shrink">
          <q-btn
            @click="addNewQweet"
            color="primary"
            label="Qweet"
            :disable="!newQweetContent"
            class="q-mb-lg"
            rounded
            unelevated
            no-caps
          />
        </div>
      </div>

      <q-separator size="10px" color="grey-2" class="divider"/>

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item
            class="qweet q-py-md"
            v-for="qweet in qweets"
            :key="qweet.id"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://s.gravatar.com/avatar/14ac8ac4dcdf328eae27da2eff4b4b9d?s=80" alt="">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Buğra Otken</strong>
                <span class="text-grey-7">
              @bugraotken
              <br class="lt-md">&bull; {{qweet.date | relativeDate}}

            </span>
              </q-item-label>

              <q-item-label class="qweet-content text-body1">
                {{qweet.content}}
              </q-item-label>

              <div class="qweet-icons row justify-between q-my-sm">
                <q-btn
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                  flat
                  round
                />

                <q-btn
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                  flat
                  round
                />

                <q-btn
                  @click="toggleQweet(qweet)"
                  :color="qweet.liked ? 'pink' : 'grey'"
                  :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                  size="sm"
                  flat
                  round
                />

                <q-btn
                  @click="deleteQweet(qweet)"
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                  flat
                  round
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>

  </q-page>
</template>

<script>
  import {formatDistance} from "date-fns";
  import db from "src/boot/firebase";


  export default {
    name: 'PageHome',

    data() {
      return {
        newQweetContent: "",
        qweets: []
      }
    },

    methods: {
      addNewQweet() {
        const newQweet = {
          content: this.newQweetContent,
          date: Date.now(),
          liked: false
        }

        db.collection("qweets")
        .add(newQweet)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          this.newQweetContent = "";
        }).catch(error => {
          console.log("Error adding document: ", error);
        })
      },

      deleteQweet(qweet) {
        db.collection("qweets")
          .doc(qweet.id)
          .delete()
          .then(() => {
            console.log("Document was successfully deleted!");
          }).catch(error => {
          console.log("Error removing document: ", error)
        })
      },

      toggleQweet(qweet) {
        db.collection("qweets")
          .doc(qweet.id)
          .update({liked: !qweet.liked})
          .then(() => {
            console.log("Document was successfully updated!");
          })
          .catch(error => {
            console.log("Error updating document: ", error);
          })
      },

      getQweets() {
        db.collection("qweets")
          .orderBy("date")
          .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            let qweetChange = change.doc.data();
            qweetChange.id = change.doc.id;

            if (change.type === "added") {
              console.log("New qweet: ", qweetChange);
              this.qweets.unshift(qweetChange);
            }
            if (change.type === "modified") {
              console.log("Modified qweet: ", qweetChange);
              const index = this.qweets.findIndex(qweet => {
                return qweet.id === qweetChange.id;
              })
              Object.assign(this.qweets[index], qweetChange);
              // Same with
              // this.qweets[index]["liked"] = !this.qweets[index]["liked"];
            }
            if (change.type === "removed") {
              console.log("Removed qweet: ", qweetChange);
              const index = this.qweets.findIndex(qweet => {
                return qweet.id === qweetChange.id;
              })
              this.qweets.splice(index, 1);
            }
          })
        })

      }
    },

    filters: {
      relativeDate(value) {
        return formatDistance(value, new Date());
      }
    },

    mounted() {
      this.getQweets();
    }
  }
</script>

<style lang="sass">
  .new-qweet
    textarea
      font-size: 19px
      line-height: 1.4 !important

  .divider
    border-top: 1px solid
    border-bottom: 1px solid
    border-color: $grey-4

  .qweet:not(:first-child)
    border-top: 1px solid rgba(0, 0, 0, 0.12)

  .qweet-content
    white-space: pre-line

  .qweet-icons
    margin-left: -5px
</style>

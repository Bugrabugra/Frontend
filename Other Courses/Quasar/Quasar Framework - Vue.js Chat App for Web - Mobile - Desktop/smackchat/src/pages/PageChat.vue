<template>
  <q-page
    class="page-chat flex column"
    ref="pageChat"
  >
    <q-banner
      v-if="!otherUserDetails.online"
      class="bg-grey-4 text-center fixed-top"
    >
      {{otherUserDetails.name}} is offline
    </q-banner>

    <div
      :class="{'invisible': !showMessages}"
      class="q-pa-md column col justify-end"
    >
      <q-chat-message
        v-for="(message, key) in messages"
        :key="message.key"
        :name="message.from === 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from === 'me'"
        :bg-color="message.from === 'me' ? 'white' : 'light-green-2'"
      />
    </div>

    <q-footer elevated>
      <q-toolbar>
        <q-form
          @submit="sendMessage"
          class="full-width"
        >
          <div class="row">
            <q-input
              v-model="newMessage"
              ref="newMessage"
              bg-color="white"
              label="Message"
              class="col"
              outlined
              rounded
              dense
            />

            <q-space/>

            <q-btn
              icon="send"
              color="white"
              type="submit"
              round
              dense
              flat
            />
          </div>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import mixinOtherUserDetails from "src/mixins/mixin-other-user-details"


  export default {
    name: "PageChat",

    mixins: [mixinOtherUserDetails],

    data() {
      return {
        newMessage: "",
        showMessages: false
      }
    },

    computed: {
      ...mapState("store", ["messages", "userDetails"]),
    },

    methods: {
      ...mapActions("store", ["firebaseGetMessages", "firebaseStopGettingMessages", "firebaseSendMessage"]),

      sendMessage() {
        console.log("aaa")
        this.firebaseSendMessage({
          message: {
            text: this.newMessage,
            from: "me"
          },
          otherUserId:this.$route.params.otherUserId
        })

        this.clearMessage();
      },

      clearMessage() {
        this.newMessage = "";
        this.$refs.newMessage.focus();
      },

      scrollToBottom() {
        const pageChat = this.$refs.pageChat.$el;
        setTimeout(() => {
          window.scrollTo(0, pageChat.scrollHeight)
        }, 20)
      }
    },

    watch: {
      messages(val) {
        if (Object.keys(val).length) {
          this.scrollToBottom()
          setTimeout(() => {
            this.showMessages = true;
          }, 20)
        }
      }
    },

    mounted() {
      this.firebaseGetMessages(this.$route.params.otherUserId);
    },

    destroyed() {
      this.firebaseStopGettingMessages();
    }
  }
</script>

<style lang="stylus">
  .page-chat
    background #e2dfd5
  .q-banner
    top 50px
    z-index 2
    opacity: 0.8
  .q-message
    z-index 1
</style>

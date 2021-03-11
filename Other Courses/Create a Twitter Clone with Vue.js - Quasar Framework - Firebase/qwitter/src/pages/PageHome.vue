<template>
  <q-page>
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
      <q-item
        class="q-py-md"
        v-for="qweet in qweets"
        :key="qweet.date"
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
              color="grey"
              icon="far fa-heart"
              size="sm"
              flat
              round
            />

            <q-btn
              color="grey"
              icon="fas fa-trash"
              size="sm"
              flat
              round
            />
          </div>
        </q-item-section>

        <q-item-section side top>
          {{qweet.date | relativeDate}}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
  import {formatDistance} from "date-fns"


  export default {
    name: 'PageHome',

    data() {
      return {
        newQweetContent: "",
        qweets: [
          {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae.",
            date: 1615459905571
          },
          {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae.",
            date: 1615459924126
          }

        ]
      }
    },

    filters: {
      relativeDate(value) {
        return formatDistance(value, new Date());
      }
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

  .qweet-content
    white-space: pre-line

  .qweet-icons
    margin-left: -5px
</style>

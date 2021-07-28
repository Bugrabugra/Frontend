<template>
  <div class="home">
    <div class="mx-auto max-w-screen-lg">
      <div class="flex flex-col items-center justify-center">
        <div class="btn" @click="$store.commit('getRandomQuote')">Get Random Quote</div>

        <p
            class="mb-6 my-10 text-2xl text-center text-gray-600"
            v-if="typeof $store.state.quote._id != 'undefined'"
        >
          <span>"{{$store.state.quote.content}}"</span><br>
          <span class="text-gray-400">- {{$store.state.quote.author}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {}
  }
</script>

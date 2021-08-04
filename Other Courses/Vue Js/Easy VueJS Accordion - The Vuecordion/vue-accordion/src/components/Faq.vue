<template>
  <div :class="open ? 'faq open' : 'faq'">
    <div class="question">
      {{faq.question}}
    </div>

    <div class="answer">
      {{faq.answer}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "Faq",
    props: ["faq", "index", "open"]
  }
</script>

<style scoped>

</style>
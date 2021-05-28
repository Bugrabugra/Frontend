<template>

    <form>
      <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group align-content-center justify-content-center">
        <label for="ta">Quote</label>
        <textarea id="ta" class="form-control" rows="3" v-model="quote"></textarea>
      </div>
      <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
        <button class="btn btn-primary" v-on:click.prevent="createNew">Add Quote</button>
      </div>
    </form>

</template>

<script>
  export default {
    name: "NewQuote",

    data() {
      return {
        quote: ""
      }
    },

    methods: {
      createNew() {
        this.$emit("quoteAdded", this.quote)
      }
    }
  }
</script>

<style scoped>

</style>
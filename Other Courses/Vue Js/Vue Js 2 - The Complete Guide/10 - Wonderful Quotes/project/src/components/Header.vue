<template>
  <div class="row">
    <div class="col-sm-12">
      <h3>Quotes Added</h3>
        <div class="progress">
          <div
              class="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              v-bind:style="{width: (quoteCount / maxQuotes) * 100 + '%'}"
              v-bind:aria-valuenow="`${(quoteCount / maxQuotes) * 100}`"
          >
            {{quoteCount}} / {{maxQuotes}}
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    props: ["quoteCount", "maxQuotes"]
  }
</script>

<style scoped>

</style>
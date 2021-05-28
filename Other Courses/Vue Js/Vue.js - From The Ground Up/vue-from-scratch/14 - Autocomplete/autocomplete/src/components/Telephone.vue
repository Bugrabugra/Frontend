<template>
  <div class="mt-6">
    <input
        type="text"
        v-bind:placeholder="template"
        class="w-56 text-2xl bg-gray-300 p-3 rounded-lg focus:outline-none"
        v-model="number"
    >
  </div>
</template>

<script>
  export default {
    props: [
      "template"
    ],

    name: "Telephone",

    data() {
      return {
        number: "",
        format: "",
        regex: "^"
      }
    },

    watch: {
      number() {
        this.number = this.number.replace(/[^0-9]/g, "")
          .replace(new RegExp(this.regex, 'g'), this.format)
          .substr(0, this.template.length)
      }
    },

    mounted() {
      let x = 1;
      this.format = this.template.replace(/X+/g, () => {
        return "$" + x++;
      })
      this.template.match(/X+/g).forEach((char) => {
        this.regex += '(\\d{' + char.length + '})?'
        console.log(this.regex);
      })
    }
  }
</script>

<style scoped>

</style>
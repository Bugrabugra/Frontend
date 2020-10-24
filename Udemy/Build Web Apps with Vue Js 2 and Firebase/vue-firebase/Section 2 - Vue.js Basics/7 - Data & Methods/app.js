new Vue({
  el: "#app",
  data: {
    title: "Becoming a Vue Ninja",
    name: "Ryu"
  },
  methods: {
    greet(name) {
      return `Hello there ${this.name}`
    }
  }
})
new Vue({
  el: "#app",
  data: {
    title: "Becoming a Vue Ninja",
    name: "Ryu",
    url: "www.youtube.com",
    classes: ["one", "two"]
  },
  methods: {
    greet(time) {
      return `Good ${time} ${this.name}`
    }
  }
})
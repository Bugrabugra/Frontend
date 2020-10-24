new Vue({
  el: "#app",
  data: {
    title: "Becoming a Vue Ninja",
    wage: 10
  },
  methods: {
    changeWage(amount) {
      this.wage += amount;
    }
  }
})
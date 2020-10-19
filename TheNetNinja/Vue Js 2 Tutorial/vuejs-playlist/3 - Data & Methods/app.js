new Vue({
  el: "#vue-app",
  data: {
    name: "Shaun",
    job: "ninja"
  },
  methods: {
    greet: function(timeOfDay) {
      return `Good ${timeOfDay} ${this.name}`;
    }
  }
});
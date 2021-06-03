new Vue({
  el: "#vue-app",
  data: {
    name: "Shaun",
    job: "ninja",
    website: "www.google.com",
    websiteTag: "<a href='https://www.google.com'>Google</a>"
  },
  methods: {
    greet: function(timeOfDay) {
      return `Good ${timeOfDay} ${this.name}`;
    }
  }
});
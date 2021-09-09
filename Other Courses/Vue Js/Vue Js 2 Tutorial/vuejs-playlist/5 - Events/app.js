new Vue({
  el: "#vue-app",
  data: {
    age: 25,
    x: 0,
    y: 0
  },
  methods: {
    addYear: function(year) {
      return this.age = this.age + year;
    },
    subtractYear: function(year) {
      return this.age = this.age - year;
    },
    updateXY: function(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    }
  }
});
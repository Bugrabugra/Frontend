const ratingMixin = {
  methods: {
    getRatingColor() {
      if (this.movie.rating > 7) {
        return "#5eb85e";
      } else if (this.movie.rating > 4) {
        return "#ffa809";
      } else {
        return "#e10505";
      }
    },
  }
}

export default ratingMixin
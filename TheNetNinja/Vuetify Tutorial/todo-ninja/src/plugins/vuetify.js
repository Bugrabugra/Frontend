import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify);

const vuetify = new Vuetify({
  iconfont: "md",
  theme: {
    primary: "#9652ff",
    success: "#3cd1c2",
    info: "#ffaa2c",
    error: "#f83e70"
  }
})

export default vuetify;

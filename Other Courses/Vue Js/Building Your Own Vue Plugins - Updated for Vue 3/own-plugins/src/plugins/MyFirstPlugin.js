import MyHeader from "../components/MyHeader.vue";


export default {
  install: (app, options) => {
    /*
      our code for the plugin goes here
      app is the result of createApp()
      options is user options passed in
    */
    app.component("MyHeader", MyHeader);

    app.directive("font-size", (el, binding, vnode) => {
      let size = 16;
      switch (binding.arg) {
        case "small":
          size = options.fontSize.small;
          break;
        case "large":
          size = options.fontSize.large;
          break;
        default:
          size = options.fontSize.medium;
          break;
      }
      el.style.fontSize = size + "px";
    });

    app.mixin({
      data() {
        return {
          featuredLink: "https://learnvue.co"
        }
      },
      created() {
        console.log("Printing from created.");
      }
    });

    const logout = () => {
      console.log("Logout is being called");
    };

    app.provide("logout", logout);
  }
}
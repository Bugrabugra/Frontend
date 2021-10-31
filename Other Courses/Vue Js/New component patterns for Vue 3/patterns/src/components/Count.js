import {h, reactive, ref} from "vue";


const Count = function(props) {
  const x = ref("x");
  const y = reactive({a: 1, b: 2});

  function onClick() {
    console.log("I'm clicked");
  }
  return h("p", {class: "count", onClick}, props.count)
};

Count.props = {
  count: {
    type: Number,
    required: true
  }
}

export default Count;

<template>
  <h1>{{count}}</h1>
  <h3>Hello World</h3>
  <h1>Cube</h1>

  <h2>reactive</h2>
  <h4>reactive Length: {{box.length}}</h4>
  <h4>reactive Width: {{box.width}}</h4>
  <h4>reactive Height: {{box.height}}</h4>

  <h2>toRef</h2>
  <h4>ref Length: {{refLength}}</h4>
  <h4>ref Width: {{refWidth}}</h4>
  <h4>ref Height: {{refHeight}}</h4>

  <h2>toRefs</h2>
  <h4>refs Length: {{length}}</h4>
  <h4>refs Width: {{width}}</h4>
  <h4>refs Height: {{height}}</h4>
  <button ref="button" @click="double">Press Me</button>

  <h2>customRef</h2>
  <h4>{{test}}</h4>
  <button @click="change">Press Me</button>
</template>

<script setup>
  import {ref, isRef, unref, reactive, toRef, toRefs, customRef} from "vue";

  // ref, isRef, unref
  // ------------------------------
  let count = ref(1);
  const button = ref(null);

  const double = () => {
    count.value = unref(count) * 2;
    const check = isRef(count) ? count.value : count;
    console.log(check);

    console.log(button.value)
  };

  // reactive, toRef, toRefs
  // ------------------------------
  const box = reactive({
    length: 10,
    width: 20,
    height: 33
  });

  const refLength = toRef(box, "length");
  const refWidth = toRef(box, "width");
  const refHeight = toRef(box, "height");

  const {length, width, height} = toRefs(box);

  // customRef
  // ------------------------------
  const useDebouncedRef = (value, delay=1000) => {
    let timeout;
    return customRef((track, trigger) => {
      return {
        get() {
          track();
          return value;
        },
        set(newValue) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            value = newValue;
            trigger();
          }, delay);
        }
      }
    })
  };

  const test = useDebouncedRef("hello");
  const change = () => {
    test.value = "george";
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

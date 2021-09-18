<template>
  <TabsWrapper>
    <Tab title="Tab 1">Hello from Tab 1</Tab>
    <Tab title="Tab 2">Hello from Tab 2</Tab>
    <Tab title="Tab 3">Hello from Tab 3</Tab>
    <Tab title="Tab 4">Hello from Tab 4</Tab>
  </TabsWrapper>
</template>

<script setup>
  import TabsWrapper from "./components/TabsWrapper.vue";
  import Tab from "./components/Tab.vue";</script>

<style>
  body {
    background-color: #2c3e50;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

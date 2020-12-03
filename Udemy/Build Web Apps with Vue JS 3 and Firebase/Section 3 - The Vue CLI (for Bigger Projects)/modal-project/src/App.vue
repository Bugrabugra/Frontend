<template>
  <h1>{{title}}</h1>
  <div>
    <input type="text" ref="name">
    <button @click="handleClick">click me</button>
  </div>

  <div v-if="showModal">
    <Modal theme="sale" :header="header" :text="text" @close="toggleModal">
      <template v-slot:links>
        <a href="#">sign up now</a>
        <a href="#">more info</a>
      </template>
      <h1>{{header}}</h1>
      <p>{{text}}</p>
    </Modal>
  </div>

  <teleport to=".modals" v-if="showModalTwo">
    <Modal theme="sale" :header="header" :text="text" @close="toggleModalTwo">
      <h1>{{header}}</h1>
      <p>{{text}}</p>
    </Modal>
  </teleport>

  <p>Welcome...</p>
  <button @click.alt="toggleModal">open modal (alt)</button>
  <button @click="toggleModalTwo">open modal</button>

</template>

<script>
import Modal from "./components/Modal";


export default {
  name: 'App',

  data() {
    return {
      title: "My first Vue App :)",
      header: "Sign up for the Giveaway!",
      text: "Grab your ninja swag for half price!",
      showModal: false,
      showModalTwo: false
    }
  },

  components: {
    Modal: Modal
  },

  methods: {
    handleClick() {
      console.log(this.$refs.name);
      this.$refs.name.classList.add("active");
      this.$refs.name.focus();
    },

    toggleModal() {
      this.showModal = !this.showModal;
    },

    toggleModalTwo() {
      this.showModalTwo = !this.showModalTwo;
    }
  }
}
</script>

<style>
  #app, .modals {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1 {
    border-bottom: 1px solid #ddd;
    display: inline-block;
    padding-bottom: 10px;
  }

</style>

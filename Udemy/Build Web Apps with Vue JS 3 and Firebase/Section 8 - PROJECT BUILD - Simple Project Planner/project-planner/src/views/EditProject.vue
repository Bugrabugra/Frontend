<template>
  <form @submit.prevent="handleUpdate">
    <label for="text">Title:</label>
    <input id="text" type="text" v-model="title" required>
    <label for="textarea">Details:</label>
    <textarea id="textarea" v-model="details" required></textarea>

    <button>Update project</button>
  </form>
</template>

<script>
  export default {
    name: "EditProject",

    data() {
      return {
        title: "",
        details: "",
        uri: "http://localhost:3000/projects/" + this.id
      }
    },

    props: ["id"],

    methods: {
      handleUpdate() {
        let project = {
          title: this.title,
          details: this.details
        }

        fetch(this.uri, {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(project)
        }).then(() => {
          this.$router.push("/")
        }).catch(err => console.log(err))
      }
    },

    mounted() {
      fetch(this.uri)
        .then(res => res.json())
        .then(data => {
          this.title = data.title;
          this.details = data.details
        })
    }
  }
</script>

<style scoped>
  form {
    background: white;
    padding: 20px;
    border-radius: 10px;
  }

  label {
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0
  }

  input {
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
  }

  textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
  }

  form button {
    display: block;
    margin: 20px auto 0;
    background: #00ce89;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 6px;
    font-size: 16px;
  }
</style>
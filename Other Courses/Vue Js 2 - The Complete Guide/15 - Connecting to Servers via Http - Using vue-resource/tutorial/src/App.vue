<template>
  <div id="app">
    <div class="container">
      <h1>HTTP</h1>
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="user.username" id="username" type="text" class="form-control">
      </div>

      <div class="form-group">
        <label for="mail">Mail</label>
        <input v-model="user.email" id="mail" type="text" class="form-control">
      </div>

      <button @click="submit" class="btn btn-primary">Submit</button>

      <hr>
      <input type="text" class="form-control" v-model="node">
      <br><br>

      <button class="btn btn-primary" @click="fetchData">Get Data</button>

      <br><br>

      <ul class="list-group">
        <li class="list-group-item" v-bind:key="index" v-for="(u, index) in users">{{u.username}} - {{u.email}}</li>
      </ul>

    </div>
  </div>
</template>

<script>


export default {
  name: 'App',

  data() {
    return {
      user: {
        username: "",
        email: ""
      },
      users: [],
      resource: {},
      node: "data"
    }
  },

  methods: {
    submit() {
      // this.$http.post("data.json", this.user)
      //   .then(response => {
      //     console.log(response);
      //   }).catch(error => {
      //   console.log(error);
      // })
      // this.resource.save({}, this.user);
      this.resource.saveAlt(this.user);

    },

    fetchData() {
      // this.$http.get("data.json")
      //   .then(response => {
      //     return response.json();
      //   })
      //   .then(data => {
      //     const resultArray = [];
      //     for (let key in data) {
      //       resultArray.push(data[key]);
      //     }
      //     this.users = resultArray;
      //   })
      //   .catch(error => {
      //   console.log(error);
      // })
      this.resource.getData({node: this.node})
        .then(response => {
              return response.json();
            })
            .then(data => {
              const resultArray = [];
              for (let key in data) {
                resultArray.push(data[key]);
              }
              this.users = resultArray;
            })
            .catch(error => {
            console.log(error);
          });
    }
  },

  created() {
    const customActions = {
      saveAlt: {method: "POST", url: "alternative.json"},
      getData: {method: "GET"}
    };

    this.resource = this.$resource("{node}.json", {}, customActions);
  }
}
</script>

<style>

</style>

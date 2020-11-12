<template>
  <div class="hello">
    <div style="text-align: center; margin: 0 auto; height: 50vh; width: 50%; justify-content: center">
      <h1>Vekil Sunucu Giriş Sayfası</h1>
      <form style="width: 25%; text-align: center; margin: 30px auto;">
        <div class="form-group">
          <label for="user">Kullanıcı adı </label>
          <input class="form-control" type="text" id="user" v-model="name">
        </div>
        <div class="form-group">
          <label for="pass">Şifre </label>
          <input class="form-control" type="text" id="pass" v-model="pass">
        </div>
        <button class="btn btn-primary" v-on:click.prevent="login">Giriş</button>
      </form>
    </div>
  </div>
</template>

<script>
  const axios = require('axios');


  export default {
  name: 'Login',
  data() {
    return {
      name: null,
      pass: null,
      data: null
    }
  },

  methods: {
    login() {
      if (this.name === "admin" && this.pass === "admin") {
        this.$router.push({name: "Admin", params: {data: this.data.admin}})
      } else if (this.name === "user" && this.pass === "user") {
        this.$router.push({name: "User", params: {data: this.data.user}})

      }
    }
  },

  mounted() {
    axios.post('http://localhost:3001/user', {
      user: "superadmin",
      pass: "superadmin"
    }).then((res) => {
      this.data = res.data;
      console.log("Login başarılı")
    }).catch(() => {
      console.log("Login başarısız")
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>

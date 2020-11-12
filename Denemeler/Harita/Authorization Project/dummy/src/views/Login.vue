<template>
  <div class="hello">
    <div style="text-align: center; margin: 0 auto; height: 50vh; width: 50%; justify-content: center">
      <h1>Eski Web Sitesi Giriş Sayfası</h1>
      <form style="width: 25%; text-align: center; margin: 30px auto;">
        <div class="form-group">
          <label for="user">Kullanıcı adı </label>
          <input class="form-control" type="text" id="user" v-model="user">
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
  const axios = require('axios')


  export default {
    name: 'Login',
    data() {
      return {
        user: null,
        pass: null
      }
    },

    methods: {
      login() {
        axios.post('http://localhost:3001/user', {
          user: this.user,
          pass: this.pass
        }).then(res => {
          if (res.status === 200) {
            console.log(res.data)
          }
        })
      }
    }
  }
</script>

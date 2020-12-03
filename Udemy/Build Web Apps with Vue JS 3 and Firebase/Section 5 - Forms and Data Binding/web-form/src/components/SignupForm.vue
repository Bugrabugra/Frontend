<template>
  <form @submit.prevent="handleSubmit">
    <label for="email">Email:</label>
    <input type="email" required id="email" v-model="email">

    <label for="password">Password:</label>
    <input type="password" required id="password" v-model="password">
    <div v-if="passwordError" class="error">{{passwordError}}</div>

    <label for="select">Role:</label>
    <select id="select" v-model="role">
      <option value="developer">Web Developer</option>
      <option value="designer">Web Designer</option>
    </select>

    <label for="skills">Skills:</label>
    <input type="text" id="skills" v-model="tempSkill" @keyup.alt="addSkill">
    <div
        v-for="(skill, index) in skills"
        :key="index"
        class="pill"
        @click="removeSkill"
    >
      {{skill}}
    </div>

    <div class="terms">
      <input type="checkbox" id="check" v-model="terms" required>
      <label for="check">Accept Terms and Conditions</label>
    </div>

    <div class="submit">
      <button>Create an Account</button>
    </div>

  </form>

  <p>Email: {{email}}</p>
  <p>Password: {{password}}</p>
  <p>Role: {{role}}</p>
  <p>Terms accepted: {{terms}}</p>

</template>

<script>
  export default {
    name: "SignupForm",

    data() {
      return {
        email: "mario",
        password: "",
        role: "designer",
        terms: false,
        tempSkill: "",
        skills: [],
        passwordError: ""
      }
    },

    methods: {
      addSkill(e) {
        if (e.key === "," && this.tempSkill) {
          if (!this.skills.includes(this.tempSkill)) {
            this.skills.push(this.tempSkill);
          }
          this.tempSkill = "";
        }
      },

      removeSkill(e) {
        this.skills.splice(this.skills.indexOf(e.target.innerText), 1)
      },

      handleSubmit() {
        // Validate password
        this.passwordError = this.password.length > 5 ? "" : "Password must be at least 6 chars long";
      }
    },
  }
</script>

<style scoped>
  form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }

  label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  
  input, select {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
  }

  input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
  }

  .pill {
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
  }

  button {
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
  }

  .submit {
    text-align: center;
  }

  .error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
  }
</style>
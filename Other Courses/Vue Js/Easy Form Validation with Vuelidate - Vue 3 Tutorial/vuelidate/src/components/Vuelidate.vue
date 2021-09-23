<template>
  <div class="root">
    <h2>Create an Account</h2>

    <p v-for="error in errors">
      {{error}}
    </p>

    <p>
      <input
          type="text"
          placeholder="Email"
          v-model="state.email"
      >
    </p>

    <p>
      <input
          type="password"
          placeholder="Password"
          v-model="state.passwords.password"
      >
    </p>

    <p>
      <input
          type="password"
          placeholder="Confirm Password"
          v-model="state.passwords.confirm"
      >
    </p>

    <button @click="submitForm">Submit</button>
  </div>
</template>

<script>
  import {reactive, computed, ref} from "vue";
  import useVuelidate from "@vuelidate/core";
  import {required, helpers, sameAs, email, minLength} from "@vuelidate/validators";


  export default {
    name: "Vuelidate",
    setup() {
      const state = reactive({
        email: "",
        passwords: {
          password: "",
          confirm: ""
        }
      });

      const errors = ref([]);

      const mustCapitalizeFirst = (value) => {
        return String(value).charAt(0) === String(value).charAt(0).toUpperCase();
      }

      const rules = computed(() => {
        return {
          email: {
            required: helpers.withMessage(
                "Emaili boş bırakamazsın",
                required
            ),
            email: helpers.withMessage(
                "Bir email yazmalısınız",
                email
            )
          },
          passwords: {
            password: {
              required: helpers.withMessage(
                  "Şifreyi boş bırakamazsın",
                  required
              ),
              minLength: helpers.withMessage(
                  "En az 6 karakterlik bir şifre girmelisiniz",
                  minLength(6)
              ),
              mustCapitalizeFirst: helpers.withMessage(
                  "Şifreler büyük harfle başlamalıdır",
                  mustCapitalizeFirst
              )
            },
            confirm: {
              required: helpers.withMessage(
                  "Kontrol Şifresini boş bırakamazsın",
                  required
              ),
              sameAs: helpers.withMessage(
                  "Şifreler aynı olmak zorundadır",
                  sameAs(state.passwords.password)
              ),
              minLength: helpers.withMessage(
                  "En az 6 karakterlik bir şifre girmelisiniz",
                  minLength(6)
              ),
              mustCapitalizeFirst: helpers.withMessage(
                  "Şifreler büyük harfle başlamalıdır",
                  mustCapitalizeFirst
              )
            }
          }
        }
      });

      const v$ = useVuelidate(rules, state);

      const submitForm = () => {
        errors.value = [];
        v$.value.$validate();
        console.log(v$.value)
        v$.value.$errors.forEach(error => {
          errors.value.push(error.$message)
        });
        console.log(errors.value)

        if (!v$.value.$error) {
          alert("Form successfully submitted");
        } else {
          alert("Form failed validation")
        }
      };

      return {state, v$, submitForm, errors}
    },
  }
</script>

<style scoped>
  .root {
    width: 400px;
    margin: 0 auto;
    background-color: #fff;
    padding: 30px;
    margin-top: 100px;
    border-radius: 20px;
  }

  input {
    border: none;
    outline: none;
    border-bottom: 1px solid #ddd;
    font-size: 1em;
    padding: 5px 0;
    margin: 10px 0 5px 0;
    width: 100%;
  }

  button {
    background-color: #3498db;
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    color: white;
  }
</style>
<template>
  <div>
    <input type="password" v-model="form.password">
    {{passwordStrength}}
  </div>
</template>

<script>
  import {computed, ref, reactive, toRefs} from "vue";


  export default {
    name: 'Home',

    setup() {
      const state = reactive({
        form: {
          password: ""
        },

        passwordStrength: computed(() => {
          return Math.min(((state.form.password.length * 100) / 10), 100);
        })
      })

      return toRefs(state)
    }

  }
</script>

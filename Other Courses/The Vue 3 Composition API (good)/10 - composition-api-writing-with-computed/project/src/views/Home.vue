<template>
  <div>
    <input type="text" v-model="nameShouting">
  </div>
</template>

<script>
  import {ref, computed} from "vue";


  export default {
    name: 'Home',

    setup() {
      const name = ref("");
      const nameShouting = computed({
        get: () => name.value.toUpperCase(),
        set: (value) => {
          name.value = value.toUpperCase()
        }
      })

      return {nameShouting}
    }
  }
</script>

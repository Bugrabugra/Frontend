<template>
  <div>
    <h3>Hello from User Component</h3>
    <h5>{{user}}</h5>
  </div>
</template>

<script>
  export default {
    name: "User",
    async setup() {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Success");
        }, 2000);
      })
      const user = await promise;

      return {user}
    }
  }
</script>

<style scoped>

</style>
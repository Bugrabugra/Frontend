<template>
  <div>
    <h1>Admin</h1>
    <div class="accordion" id="accordionExample" style="width: 20%; margin: auto;">
      <div class="card" v-for="(item, key) in data" v-bind:key="key">
        <div class="card-header">
          <h2 class="mb-0">
            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" v-bind:data-target="`#key-${key}`" style="font-size: large;margin: auto;">
              {{Object.keys(item)[0]}}
            </button>
          </h2>
        </div>

        <div v-bind:id="`key-${key}`" class="hide collapse" data-parent="#accordionExample">
          <div class="card-body" v-for="(it, keyy) in Object.values(item)[0]" v-bind:key="keyy">
            {{it}}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Admin",
    data() {
      return {}
    },
    props: ["data"]
  }
</script>

<style scoped>

</style>
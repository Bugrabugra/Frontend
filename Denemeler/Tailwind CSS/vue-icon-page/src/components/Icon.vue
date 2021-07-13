<template>
  <div>
    <div class="bg-gray-50 h-24 flex justify-center items-center rounded">
      <span class="text-3xl">
        <i class="" :class="code"/>
      </span>
    </div>

    <p class="text-sm text-center">{{name}}</p>
  </div>
</template>

<script>
  export default {
    name: "Icon",
    props: ["code", "name"],
    data() {
      return {}
    }
  }
</script>
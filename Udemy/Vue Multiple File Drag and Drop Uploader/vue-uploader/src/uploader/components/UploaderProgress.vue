<template>
  <div class="h-20 w-20 mr-6 relative">
    <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-blue-500 text-sm font-medium leading-tight">
          {{progress}}%
        </span>
    </div>

    <svg class="-rotate-90" viewBox="0 0 120 120">
      <circle
          :r="radius"
          cx="60"
          cy="60"
          fill="none"
          stroke-width="12"
          class="stroke-current text-gray-200"
      />

      <circle
          :r=radius
          cx="60"
          cy="60"
          fill="none"
          stroke-width="12"
          class="stroke-current text-blue-500"
          :stroke-dasharray="dash"
          :stroke-dashoffset="offset"
      />
    </svg>
  </div>
</template>

<script>
  export default {
    name: "UploaderProgress",

    props: {
      progress: {
        required: true,
        type: Number
      }
    },

    data() {
      return {
        radius: 54
      }
    },

    computed: {
      dash() {
        return 2 * Math.PI * this.radius
      },

      offset() {
        let circle = this.dash;
        let progress = this.progress / 100;

        return circle * (1 - progress);
      }
    }
  }
</script>

<style scoped>

</style>
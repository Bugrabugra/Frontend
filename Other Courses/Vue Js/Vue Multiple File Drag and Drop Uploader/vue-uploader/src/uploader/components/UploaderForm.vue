<template>
  <form
      enctype="multipart/form-data"
      novalidate
      class="bg-gray-200 border-gray-400 border-2 border-dashed rounded-lg p-10 flex items-center justify-center mb-6 relative"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      :class="{'border-gray-600': dragging}"
  >
    <input
        type="file"
        class="absolute opacity-0 w-full h-full top-0 left-0"
        @change="handleFilesChosen"
        multiple
    >
    <template v-if="dragging">
      <div class="text-gray-700">
        Nearly there. Let go to upload <span class="font-medium">{{draggingCount}}</span> items!
      </div>
    </template>

    <template v-else>
      <div class="text-gray-700">
        Drop here to upload or
        <span class="text-blue-500">choose files</span>
      </div>
    </template>

  </form>
</template>

<script>
  export default {
    name: "UploaderForm",

    data() {
      return {
        dragging: false,
        draggingCount: 0
      }
    },

    methods: {
      handleFilesChosen(e) {
        this.dragging = false;
        this.$emit("chosen", e.target.files)
      },

      handleDragOver(e) {
        this.dragging = true;
        this.draggingCount = e.dataTransfer.items.length
      },

      handleDragLeave() {
        this.dragging = false;
        this.draggingCount = 0
      }
    }
  }
</script>

<style scoped>

</style>
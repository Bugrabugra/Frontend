<template>
  <div class="">
    <div class="sidebar-icon group">
      <slot name="icon">

      </slot>

      <span class="sidebar-tooltip group-hover:scale-100">
        <slot name="tooltip">

        </slot>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SidebarIcon",
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
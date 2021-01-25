<template>
  <div v-if="dueDate" class="row q-mb-sm">
    <q-input
      label="Due time"
      :value="dueTime"
      @input="$emit('update:dueTime', $event)"
      outlined
      clearable
    >
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy>
            <q-time
              :value="dueTime"
              @input="$emit('update:dueTime', $event)"

            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
  export default {
    name: "ModalDueTime",
    props: ["dueDate", "dueTime"]
  }
</script>

<style scoped>

</style>

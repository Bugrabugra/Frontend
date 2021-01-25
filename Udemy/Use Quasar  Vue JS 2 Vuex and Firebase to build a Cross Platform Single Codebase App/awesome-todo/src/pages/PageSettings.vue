<template>
  <q-page padding>
    <q-list bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="show12HourTimeFormat"/>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="showTasksInOneList"/>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";


  export default {
    name: "PageSettings",

    computed: {
      ...mapGetters("settings", ["settings"]),
      show12HourTimeFormat: {
        get() {
          return this.settings.show12HourTimeFormat;
        },
        set(value) {
          this.set12HourTimeFormat(value);
        }
      },

      showTasksInOneList: {
        get() {
          return this.settings.showTasksInOneList;
        },
        set(value) {
          this.setTasksInOneList(value);
        }
      }
    },

    methods: {
      ...mapActions("settings", ["set12HourTimeFormat", "setTasksInOneList"])
    }
  }
</script>

<style>

</style>

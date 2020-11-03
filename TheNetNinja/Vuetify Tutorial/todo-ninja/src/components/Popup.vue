<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{on}">
      <v-btn v-on="on" class="success">Add new project</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>Add a new project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-bind:rules="[rules.short]" label="Title" v-model="title" prepend-icon="mdi-format-title"></v-text-field>
          <v-textarea v-bind:rules="[rules.long]" label="Content" v-model="content" prepend-icon="mdi-content-paste"></v-textarea>
          <v-menu>
            <template v-slot:activator="{on}">
              <v-text-field v-bind:value="formattedDate" label="Due date" prepend-icon="mdi-calendar-range" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>

          <v-spacer></v-spacer>

          <v-btn v-bind:loading="loading" text class="success mx-0 mt-3" v-on:click="submit">
            <span>Add project</span>
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import * as dayjs from 'dayjs';
  import db from "../firestore/init";
  const advancedFormat = require('dayjs/plugin/advancedFormat')
  dayjs.extend(advancedFormat)


  export default {
    name: "Popup",

    data() {
      return {
        dialog: false,
        title: "",
        content: "",
        due: null,
        rules: {
          short: v => v.length >= 3 || "Minimum length is 3 characters",
          long: v => v.length >= 10 || "Minimum length is 10 characters",
        },
        loading: false
      }
    },

    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          const project = {
            title: this.title,
            content: this.content,
            due: this.formattedDate,
            person: "The Net Ninja",
            status: "ongoing"
          }

          // Write to firestore
          db.collection("projects").add(project)
            .then(() => {
              this.loading = false;
              this.dialog = false;
              this.$emit("eventProjectAdded")
            })
        }
      }
    },

    computed: {
      formattedDate() {
        return this.due ? dayjs(this.due).format("Do MMM YYYY") : null;
      }
    }
  }
</script>

<style scoped>

</style>
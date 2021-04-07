<template>
  <q-card style="width: 100%;">
    <q-card-section>
        <div class="row q-mb-sm">

          <div class="col-6">
                <span>
                  <q-icon
                    @click="handleIconFullness($event)"
                    class="green"
                    style="color: #6AA454; cursor:pointer;"
                    size="md"
                    name="delete"
                  />
                  % 0-50 : <strong>{{getFullnessColors.countGreen}}</strong>
                </span>
          </div>

          <div class="col-6">
                <span>
                  <q-icon
                    @click="handleIconFullness($event)"
                    class="red"
                    style="color: #ef4343; cursor:pointer;"
                    size="md"
                    name="delete"
                  />
                  % 75-100 : <strong>{{getFullnessColors.countRed}}</strong>
                </span>
          </div>

        </div>

        <div class="row">
          <div class="col-6">
                <span>
                  <q-icon
                    @click="handleIconFullness($event)"
                    class="yellow"
                    style="color: #fdc740; cursor:pointer;"
                    size="md"
                    name="delete"
                  />
                  % 50-75 : <strong>{{getFullnessColors.countYellow}}</strong>
                </span>
          </div>

          <div class="col-6">
                <span>
                  <q-icon
                    @click="handleIconFullness($event)"
                    class="grey"
                    style="cursor:pointer;"
                    color="grey"
                    size="md"
                    name="delete"
                  />
                  Veri Yok : <strong>{{getFullnessColors.countGrey}}</strong>
                </span>
          </div>
        </div>
      </q-card-section>
  </q-card>
</template>

<script>
  import {mapGetters} from "vuex";


  export default {
    name: "SideMenuFullness",

    computed: {
      ...mapGetters([
        "getFullnessColors"
      ])
    },

    methods: {
      handleIconFullness(event) {
        const classList = Array.from(event.target.classList);
        if (classList.includes("green")) {
          this.$store.dispatch("setSelectedFullness", {name: '% 0-50', value: '0-50'});
        } else if (classList.includes("yellow")) {
          this.$store.dispatch("setSelectedFullness", {name: '% 50-75', value: '50-75'});
        } else if (classList.includes("red")) {
          this.$store.dispatch("setSelectedFullness", {name: '% 75-100', value: '75-100'});
        } else {
          this.$store.dispatch("setSelectedFullness", {name: "Veri yok", value: "noValue"});
        }

        this.$store.dispatch("selectFullness");
      }
    }
  }
</script>

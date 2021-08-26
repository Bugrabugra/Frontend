<template>
  <q-card style="width: 100%;">
    <q-card-section>
      <div class="row">
        <div class="col-12">
          <span>
            <!--Sensör bağlı-->
            <q-icon
              @click="handleIcon($event)"
              class="online"
              style="color: #6666ff; cursor:pointer;"
              size="md"
              name="sensors"
            />
            {{$t("pageMainMap.expansionItems.info.lblSensorsIdentified")}} :
            <strong>{{getSensorInfos.sensorsIdentified}}</strong>
          </span>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <span>
            <!--Sensör yok-->
            <q-icon
              @click="handleIcon($event)"
              class="no-sensor"
              style="cursor:pointer;"
              color="grey"
              size="md"
              name="delete"
            />
            {{$t("pageMainMap.expansionItems.info.lblSensorsUnidentified")}} :
            <strong>{{getSensorInfos.sensorsUnidentified}}</strong>
          </span>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <span>
            <!--Bağlantı sorunu-->
            <q-icon
              @click="handleIcon($event)"
              class="problem"
              style="cursor:pointer;"
              color="grey"
              size="md"
              name="power_off"
            />
            {{$t("pageMainMap.expansionItems.info.lblConnectionProblem")}} :
            <strong>{{getSensorInfos.connectionProblem}}</strong>
          </span>
        </div>
      </div>

      <div class="row">
        <div class="col-12 text-center">
          <q-btn
            @click="clearFilters"
            :label="$t('pageMainMap.expansionItems.info.btnClearFilter')"
            color="grey-5"
            class="q-ma-xs"
            icon="clear"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
  import {mapGetters} from "vuex";


  export default {
    name: "SideMenuSensorInfo",
    data() {
      return {}
    },

    computed: {
      ...mapGetters([
        "getFullnessColors",
        "getSensorInfos"
      ])
    },

    methods: {
      clearFilters() {
        this.$store.commit("removeQueryParameter");
        this.$store.dispatch("queryContainers");
      },

      handleIcon(event) {
        const classList = Array.from(event.target.classList);
        if (classList.includes("no-sensor")) {
          this.$store.commit("removeQueryParameter");
          this.$store.dispatch(
            "updateQueryParameter",
            {
              query: "device",
              value: "null"
            }
          ).then(() => {
            this.$store.dispatch("queryContainers");
          }).catch(error => {
            console.log(error);
          });
        } else if (classList.includes("online")) {
          this.$store.commit("removeQueryParameter");
          this.$store.dispatch(
            "updateQueryParameter",
            {
              query: "device",
              value: "notnull"
            }
          ).then(() => {
            this.$store.dispatch("queryContainers");
          }).catch(error => {
            console.log(error);
          });
        } else if (classList.includes("problem")) {
          this.$store.commit("removeQueryParameter");
          this.$store.dispatch(
            "updateQueryParameter",
            {
              query: "connected",
              value: "false"
            }
          ).then(() => {
            console.log(this.$store.getters.getQueryParameters);
            this.$store.dispatch("queryContainers");
          }).catch(error => {
            console.log(error);
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>

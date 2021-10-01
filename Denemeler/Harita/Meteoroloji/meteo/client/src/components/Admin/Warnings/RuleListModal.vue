<template>
  <div v-if="isOpen" class="fixed overflow-y-hidden overflow-x-hidden inset-0 z-50">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
      <div
          @click="clickOutside"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div
          class="relative mx-auto align-bottom w-full"
          :class="{'scale-105 transition': outside}"
      >
        <div class="bg-white w-2/3 md:max-w-lg mx-auto h-full px-3 py-2 rounded-lg border-t-[10px]
                    border-red-300 shadow-2xl flex-col items-center
                    justify-center">
          <div class="mb-4">
            <ul class="h-96 overflow-y-scroll flex flex-col space-y-1">
              <li v-for="rule in rules"
                  class="px-2 py-1 hover:bg-blue-200 transition duration-200
                  bg-blue-100 rounded-md border border-blue-200"
              >
                <div class="flex items-center justify-between">
                  <input @change="handleCheckBox(rule.id)" type="checkbox" :checked="check(rule.id)">

                  <div class="grid grid-cols-2 rounded-xl px-2 py-1 gap-x-4 flex-1">
                    <div class="col-span-2 sm:col-span-1 text-left">
                      <p class="font-semibold">Olay türü:
                        <span class="font-normal">{{sourceName(rule.source)}}</span>
                      </p>
                      <p class="font-semibold">Mevcut/Yaklaşan:
                        <span class="font-normal">{{isPresent(rule.is_present)}}</span>
                      </p>
                    </div>

                    <div class="col-span-2 sm:col-span-1 text-left sm:text-right">
                      <p class="font-semibold">Minimum:
                        <span class="font-normal">{{rule.min_value}}</span>
                      </p>
                      <p class="font-semibold">Maksimum:
                        <span class="font-normal">{{rule.max_value}}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="flex-col space-x-2">
            <button class="users-button bg-blue-400" @click="chooseRulesAndCloseModal">
              Seç
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {useStore} from "vuex";
  import {computed, onMounted, ref, watch} from "vue";

  // store
  const store = useStore();
  store.dispatch("rules/getRules");

  // props
  const props = defineProps(["selectedWarning"]);

  // emits
  const emit = defineEmits(["sendRules", "closeModal"])

  // references
  const outside = ref(false);
  const isOpen = ref(true);
  const ruleList = ref([]);

  // computed
  const rules = computed(() => {
    return store.state.rules.rules;
  });

  const ruleTypes = computed(() => {
    return store.state.rules.ruleTypes;
  });

  // methods
  const check = (id) => {
    if (props.selectedWarning) {
      return props.selectedWarning.rules.indexOf(id) > -1;
    }
  };

  const chooseRulesAndCloseModal = () => {
    console.log("RULES LIST TO BE SENT: ", ruleList.value);
    isOpen.value = false;
    emit("sendRules", ruleList.value);
    emit("closeModal");
  };

  const clickOutside = () => {
    outside.value = true;
    setTimeout(() => {
      outside.value = false;
    }, 200)
  };

  const sourceName = (name) => {
    return ruleTypes.value.find(_rule => {
      return _rule.value === name
    })["name"];
  };

  const isPresent = (bool) => {
    if (bool) {
      return "Evet"
    } else if (bool === null) {
      return "-"
    } else {
      return "Hayır";
    }
  }

  const handleCheckBox = (id) => {
    if (ruleList.value.indexOf(id) === -1) {
      ruleList.value.push(id);
      store.commit("general/setRuleList");
    } else {
      ruleList.value.splice(ruleList.value.indexOf(id), 1);
      store.commit("general/setRuleList");
    }
  }

  onMounted(() => {
    ruleList.value = [];
    if (props.selectedWarning) {
      ruleList.value = props.selectedWarning.rules
    }
  });
</script>
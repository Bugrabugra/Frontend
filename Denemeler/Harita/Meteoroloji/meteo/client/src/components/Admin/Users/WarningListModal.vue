<template>
  <div v-if="isOpen" class="fixed overflow-y-hidden overflow-x-hidden inset-0
       z-50">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20
                text-center">
      <div
          @click="clickOutside"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div
          class="relative mx-auto align-bottom w-full"
          :class="{'scale-105 transition': outside}"
      >
        <div class="bg-white w-2/3 md:max-w-lg mx-auto h-full px-3 py-2 rounded-lg
                    border-t-[10px] border-red-300 shadow-2xl flex-col items-center
                    justify-center">
          <div class="mb-4">
            <ul class="h-96 overflow-y-scroll flex flex-col space-y-1">
              <li v-for="warning in warnings"
                  class="px-2 py-1 hover:bg-blue-200 transition duration-200
                  bg-blue-100 rounded-md border border-blue-200"
              >
                <div class="flex items-center justify-between">
                  <input
                      class="h-5 w-5"
                      @change="handleCheckBox(warning.id)"
                      type="checkbox"
                      :checked="check(warning.id)"
                  >

                  <div class="grid grid-cols-2 rounded-xl px-2 py-1 gap-x-4 flex-1">
                    <div class="col-span-2 text-left">
                      <p class="font-semibold">Olay türü:
                        <span class="font-normal">{{sourceName(warning.source)}}</span>
                      </p>
                      <p class="font-semibold">Olay adı:
                        <span class="font-normal">{{warning.event}}</span>
                      </p>
                    </div>

                    <div class="col-span-2 text-left">
                      <p class="font-semibold">Uyarı mesajı:
                        <span class="font-normal">{{warning.message}}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="flex-col space-x-2">
            <button class="users-button bg-blue-400" @click="chooseWarningsAndCloseModal">
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
  import {computed, onMounted, ref} from "vue";

  // store
  const store = useStore();
  store.dispatch("warnings/getWarnings");

  // props
  const props = defineProps(["selectedUser"]);

  // references
  const outside = ref(false);
  const isOpen = ref(true);
  const warningList = ref([]);

  // computed
  const ruleTypes = computed(() => {
    return store.state.rules.ruleTypes;
  });

  const warnings = computed(() => {
    return store.state.warnings.warnings;
  });

  // methods
  const check = (id) => {
    if (props.selectedUser.warnings_to_receive) {
      return props.selectedUser.warnings_to_receive.indexOf(id) > -1;
    }
  };

  const sourceName = (name) => {
    if (name) {
      return ruleTypes.value.find(_rule => {
        return _rule.value === name;
      })["name"];
    }
  };

  const chooseWarningsAndCloseModal = () => {
    console.log("WARNINGS LIST TO BE SENT: ", warningList.value);
    isOpen.value = false;
    store.commit("users/setSelectedWarningsList", warningList.value);
    store.commit("users/setSelectWarningsModalOpen", false);
  };

  const clickOutside = () => {
    outside.value = true;
    setTimeout(() => {
      outside.value = false;
    }, 200)
  };

  const handleCheckBox = (id) => {
    console.log("ID: ", id);
    console.log("WARNING LIST: ", warningList.value);
    if (warningList.value.indexOf(id) === -1) {
      warningList.value.push(id);
    } else {
      warningList.value.splice(warningList.value.indexOf(id), 1);
    }
  }

  onMounted(() => {
    warningList.value = [];
    if (props.selectedUser.warnings_to_receive) {
      warningList.value = props.selectedUser.warnings_to_receive
    }
  });
</script>
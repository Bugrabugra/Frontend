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
              <li v-for="poi in pois"
                  class="px-2 py-1 hover:bg-blue-200 transition duration-200
                  bg-blue-100 rounded-md border border-blue-200"
              >
                <div class="flex items-center justify-between">
                  <input @change="handleCheckBox(poi.id)" type="checkbox" :checked="check(poi.id)">

                  <div class="grid grid-cols-2 rounded-xl px-2 py-1 gap-x-4 flex-1">
                    <div class="col-span-2 text-left">
                      <p class="font-semibold">Bölge adı:
                        <span class="font-normal">{{poi.location}}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="flex-col space-x-2">
            <button class="users-button bg-blue-400" @click="choosePOIsAndCloseModal">
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
  store.dispatch("map/getPOIs");

  // props
  const props = defineProps(["selectedUser"]);

  // references
  const outside = ref(false);
  const isOpen = ref(true);
  const poiList = ref([]);

  // computed
  const pois = computed(() => {
    return store.state.map.POIs;
  });

  // methods
  const check = (id) => {
    if (props.selectedUser) {
      return props.selectedUser.poi_responsibilities.indexOf(id) > -1;
    }
  };

  const choosePOIsAndCloseModal = () => {
    console.log("POIS LIST TO BE SENT: ", poiList.value);
    isOpen.value = false;
    store.commit("users/setSelectedPOIsList", poiList.value);
    store.commit("users/setSelectPOIsModalOpen", false);
  };

  const clickOutside = () => {
    outside.value = true;
    setTimeout(() => {
      outside.value = false;
    }, 200)
  };

  const handleCheckBox = (id) => {
    if (poiList.value.indexOf(id) === -1) {
      poiList.value.push(id);
    } else {
      poiList.value.splice(poiList.value.indexOf(id), 1);
    }
  }

  onMounted(() => {
    poiList.value = [];
    if (props.selectedUser) {
      poiList.value = props.selectedUser.poi_responsibilities
    }
  });
</script>
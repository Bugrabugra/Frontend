<template>
  <RuleListModal
      v-if="showRulesList"
      :selectedWarning="selectedWarning"
  />
  <div class="bg-gray-100 rounded-b-xl shadow-2xl">
    <div class="px-4 py-2">
      <!--header-->
      <h2 class="text-xl font-bold text-gray-600">
        Uyarı yaratma/düzenleme
      </h2>

      <!--crud menu-->
      <div class="mt-2 border border-gray-400 rounded-xl px-2 py-2 grid grid-cols-12 gap-y-2
                  gap-x-2">
        <div class="col-span-12 md:col-span-10 flex flex-col flex-nowrap space-y-1">
          <!--source-->
          <div class="flex">
            <label class="w-1/3 py-1 font-bold text-gray-700">Olay türü:</label>
            <select class="w-2/3 users-input" v-model="inputSource">
              <option
                  v-for="(ruleType, index) in ruleTypes"
                  :key="index"
                  :value="ruleType.value"
              >
                {{ruleType.name}}
              </option>
            </select>
          </div>
          <p class="text-xs text-red-600" v-if="errorSource">
            *{{errorSource["message"]}}
          </p>

          <!--event-->
          <div class="flex">
            <label class="w-1/3 py-1 font-bold text-gray-700" for="source-name">Olay adı:</label>
            <input class="w-2/3 users-input" type="text" v-model="inputEvent" id="source-name">
          </div>

          <!--message-->
          <div class="flex">
            <label class="w-1/3 py-1 font-bold text-gray-700">Uyarı mesajı:</label>
            <textarea rows="4" class="w-2/3 users-input" v-model="inputMessage" id="message"/>
          </div>

          <!--isScreen-->
          <div class="flex items-center">
            <label class="w-1/3 py-1 font-bold text-gray-700" for="is-screen">Ekranda gözüksün:</label>
            <input class="w-2/3 h-4 w-4" type="checkbox" v-model="inputIsScreen" id="is-screen">
          </div>

          <!--isField-->
          <div class="flex items-center">
            <label class="w-1/3 py-1 font-bold text-gray-700" for="is-field">Saha ekibine gitsin:</label>
            <input class="w-2/3 h-4 w-4" type="checkbox" v-model="inputIsField" id="is-field">
          </div>

          <!--rules-->
          <div class="flex items-center">
            <label class="w-1/3 py-1 font-bold text-gray-700">Kurallar:</label>
            <button class="users-button bg-indigo-400 hover:bg-indigo-500
                       text-indigo-700 hover:text-indigo-100"
                    @click="openRulesList"
            >
              Kuralları tanımla
            </button>
          </div>

          <!--defined rules-->
          <!--<div class="flex items-center">-->
          <!--  <label class="w-1/3 py-1 font-bold text-gray-700">Tanımlanan kurallar:</label>-->
          <!--  <p>{{inputRules}}</p>-->
          <!--</div>-->

        </div>

        <div class="col-span-12 md:col-span-2">
          <div class="flex flex-row md:flex-col md:h-full flex-wrap w-full
                      space-x-2 md:space-x-0 md:space-y-2 justify-between">
            <!--create-->
            <button
                @click="createWarning"
                :disabled="indexClickedWarning !== null"
                class="users-button flex-1 bg-green-400 hover:bg-green-500
                       text-green-700 hover:text-green-100"
                :class="{
                  'disabled:bg-gray-200 disabled:text-green-700':
                  indexClickedWarning !== null,
                }"
            >Oluştur</button>

            <!--edit-->
            <button
                @click="editWarning"
                :disabled="indexClickedWarning === null"
                class="users-button flex-1 bg-yellow-400 hover:bg-yellow-500
                       text-yellow-700 hover:text-yellow-100"
                :class="{
                  'disabled:bg-gray-200 disabled:text-green-700':
                  indexClickedWarning === null,
                }"
            >Düzenle</button>

            <!--clear-->
            <button
                @click="clear"
                class="users-button flex-1 bg-blue-400 hover:bg-blue-500
                       text-blue-700 hover:text-blue-100"
            >Temizle</button>

            <!--delete-->
            <button
                @click="deleteWarning"
                class="users-button flex-1 bg-red-400 hover:bg-red-500
                       text-red-700 hover:text-red-100"
            >Sil</button>
          </div>
        </div>
      </div>

      <!--header-->
      <div class="mt-6 flex flex-wrap justify-between items-center">
        <h2 class="text-xl font-bold text-gray-600">
          Uyarılar
        </h2>

        <div class="flex justify-between items-center">
          <label for="search">Uyarı türü ara:</label>
          <input
              v-model="searchWarningSource"
              type="text"
              id="search"
              class="flex-1 ml-2 w-full users-input">
        </div>
      </div>

      <!--rules list-->
      <div class="mt-2 flex flex-col items-center justify-center border
                  border-gray-400 rounded-xl px-2 py-2">
        <ul class="w-full space-y-2 overflow-y-scroll h-40 md:h-[320px]">
          <li v-for="(warning, index) in filteredWarnings">
            <Warning
                @click="highlight(warning, index)"
                :key="index"
                class="mr-2 scrollbar"
                :class="{
                  'bg-blue-200 border-2 border-gray-400 shadow-xl': index === indexClickedWarning,
                  'bg-red-100 shadow-md border-2 border-red-200': index !== indexClickedWarning
                }"
                :warning="warning"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref, computed, watch} from "vue";
  import {useStore} from "vuex";
  import Warning from "./Warning.vue";
  import RuleListModal from "./RuleListModal.vue";
  import useVuelidate from "@vuelidate/core";
  import {helpers, required} from "@vuelidate/validators";


  // store
  const store = useStore();
  store.dispatch("warnings/getWarnings");

  // references
  const indexClickedWarning = ref(null);
  const searchWarningSource = ref("");

  const inputSource = ref("");
  const inputEvent = ref("");
  const inputMessage = ref("");
  const inputIsScreen = ref(null);
  const inputIsField = ref(null);
  const inputRules = ref(null);

  const vuelidateErrors = ref([]);

  // computed
  const showRulesList = computed(() => {
    return store.state.warnings.isSelectRulesModalOpen;
  });

  const warnings = computed(() => {
    return store.state.warnings.warnings;
  });

  const ruleTypes = computed(() => {
    return store.state.rules.ruleTypes;
  });

  const filteredWarnings = computed(() => {
    console.log(warnings);
    return warnings.value.filter(warning => {
      return ruleTypes.value.find(ruleType => {
        return ruleType.value === warning.source;
      }).name.toLowerCase().includes(searchWarningSource.value.toLowerCase());
    });
  });

  const selectedWarning = computed(() => {
    if (store.state.warnings.selectedWarning) {
      return store.state.warnings.selectedWarning;
    } else {
      return null;
    }
  });

  const selectedRulesList = computed(() => {
    return store.state.warnings.selectedRulesList;
  });

  // methods
  const openRulesList = () => {
    store.commit("warnings/setSelectRulesModalOpen", true);
  };

  // vuelidate rules
  const vuelidateRules = computed(() => {
    return {
      inputSource: {
        required: helpers.withMessage(
            "Olay türü girilmelidir",
            required
        )
      }
    }
  });

  const errorSource = computed(() => {
    return vuelidateErrors.value.filter(error => {
      if (error.property === 'inputSource') {
        return error.message;
      }
    })[0];
  });

  // methods
  const v$ = useVuelidate(vuelidateRules, {
    inputSource: inputSource,
  });

  const CRUDResultHandler = async (result) => {
    if (result.error) {
      console.log(result.error);
      console.log(vuelidateErrors.value)

      // enable popup
      store.commit("general/setModal", true);
      // set popup content
      store.commit("general/setModalContent", `<p>${result.error}</p>`);

      // clear highlight
      indexClickedWarning.value = null;
    } else {
      // if no errors, get warnings again
      await store.dispatch("warnings/getWarnings");

      // clear input boxes
      clear();
    }
  }
  const createWarning = async () => {
    vuelidateErrors.value = [];
    v$.value.$validate();
    console.log(v$.value);
    v$.value.$errors.forEach(error => {
      vuelidateErrors.value.push({property: error.$property, message: error.$message})
    });
    console.log(vuelidateErrors.value);

    if (!v$.value.$error) {
      const warning = {
        source: inputSource.value,
        event: inputEvent.value,
        message: inputMessage.value,
        is_screen: inputIsScreen.value,
        is_field: inputIsField.value,
        rules: inputRules.value,
      };
      const result = await store.dispatch("warnings/createWarning", warning);
      await CRUDResultHandler(result);
    } else {

    }
  };

  const editWarning = async () => {
    vuelidateErrors.value = [];
    v$.value.$validate();
    console.log(v$.value);
    v$.value.$errors.forEach(error => {
      vuelidateErrors.value.push(error.$message)
    });
    console.log(vuelidateErrors.value);

    if (!v$.value.$error) {
      const warning = {
        source: inputSource.value,
        event: inputEvent.value,
        message: inputMessage.value,
        is_screen: inputIsScreen.value,
        is_field: inputIsField.value,
        rules: inputRules.value,
      };

      const result = await store.dispatch(
          "warnings/editWarning",
          {id: selectedWarning.value.id, warning: warning}
      );
      await CRUDResultHandler(result);
    } else {

    }
  };

  const deleteWarning = async () => {
    const result = await store.dispatch(
        "warnings/deleteWarning",
        selectedWarning.value.id
    );

    await CRUDResultHandler(result);
  };
  const highlight = (warning, index) => {
    clear();
    indexClickedWarning.value = index;
    store.commit("warnings/setSelectedWarning", warning);
    vuelidateErrors.value = [];
  };

  const clear = () => {
    // clear input boxes
    inputSource.value = "";
    inputEvent.value = "";
    inputMessage.value = "";
    inputIsScreen.value = null;
    inputIsField.value = null;
    inputRules.value = null;

    searchWarningSource.value = "";
    store.commit("warnings/setSelectedWarning", null);
    store.commit("warnings/setSelectedRulesList", null);

    // clear highlight
    indexClickedWarning.value = null;
  }

  watch([selectedWarning, selectedRulesList], ([newSelectedWarning, newSelectedRulesList], [a, b]) => {
    if (newSelectedWarning !== null) {
      console.log("selected rules: ", newSelectedWarning.rules)
      console.log("NEW: ", newSelectedWarning)
      inputSource.value = newSelectedWarning.source;
      inputEvent.value = newSelectedWarning.event;
      inputMessage.value = newSelectedWarning.message;
      inputIsScreen.value = newSelectedWarning.is_screen;
      inputIsField.value = newSelectedWarning.is_field;
      inputRules.value = newSelectedWarning.rules;
    }

    if (newSelectedRulesList !== null) {
      inputRules.value = newSelectedRulesList;
    }
  })
</script>
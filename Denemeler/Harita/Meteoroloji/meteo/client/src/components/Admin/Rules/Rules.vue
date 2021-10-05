<template>
  <div class="bg-gray-100 rounded-b-xl shadow-2xl">
    <div class="px-4 py-2">
      <!--header-->
      <h2 class="text-xl font-bold text-gray-600">
        Kural yaratma/düzenleme
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

          <!--min value-->
          <div class="flex">
            <label class="w-1/3 py-1 font-bold text-gray-700" for="min">Minimum değer:</label>
            <input class="w-2/3 users-input" type="number" v-model="inputMinValue" id="min">
          </div>

          <!--max value-->
          <div class="flex">
            <label class="w-1/3 py-1 font-bold text-gray-700" for="max">Maksimum değer:</label>
            <input class="w-2/3 users-input" type="number" v-model="inputMaxValue" id="max">
          </div>

          <!--isPresent-->
          <div class="flex">
            <label class="w-1/3 py-1 font-bold text-gray-700">Mevcut / Yaklaşan:</label>
            <select class="w-2/3 users-input" v-model="inputIsPresent">
              <option value="true">Mevcut</option>
              <option value="false">Yaklaşan</option>
              <option value="null" selected>Tanımsız</option>
            </select>
          </div>

        </div>

        <div class="col-span-12 md:col-span-2">
          <div class="flex flex-row md:flex-col md:h-full flex-wrap w-full
                      space-x-2 md:space-x-0 md:space-y-2 justify-between">
            <!--create-->
            <button
                @click="createRule"
                :disabled="indexClickedRule !== null"
                class="users-button flex-1 bg-green-400 hover:bg-green-500
                       text-green-700 hover:text-green-100"
                :class="{
                  'disabled:bg-gray-200 disabled:text-green-700':
                  indexClickedRule !== null,
                }"
            >Oluştur</button>

            <!--edit-->
            <button
                @click="editRule"
                :disabled="indexClickedRule === null"
                class="users-button flex-1 bg-yellow-400 hover:bg-yellow-500
                       text-yellow-700 hover:text-yellow-100"
                :class="{
                  'disabled:bg-gray-200 disabled:text-green-700':
                  indexClickedRule === null,
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
                @click="deleteRule"
                class="users-button flex-1 bg-red-400 hover:bg-red-500
                       text-red-700 hover:text-red-100"
            >Sil</button>
          </div>
        </div>
      </div>

      <!--header-->
      <div class="mt-6 flex flex-wrap justify-between items-center">
        <h2 class="text-xl font-bold text-gray-600">
          Kurallar
        </h2>

        <div class="flex justify-between items-center">
          <label for="search">Kural türü ara:</label>
          <input
              v-model="searchRuleSource"
              type="text"
              id="search"
              class="flex-1 ml-2 w-full users-input">
        </div>
      </div>

      <!--rules list-->
      <div class="mt-2 flex flex-col items-center justify-center border
                  border-gray-400 rounded-xl px-2 py-2">
        <ul class="w-full space-y-2 overflow-y-scroll h-80 md:h-[480px]">
          <li v-for="(rule, index) in filteredRules">
            <Rule
                @click="highlight(rule, index)"
                :key="index"
                class="mr-2 scrollbar"
                :class="{
                  'bg-blue-200 border-2 border-gray-400 shadow-xl': index === indexClickedRule,
                  'bg-red-100 shadow-md border-2 border-red-200': index !== indexClickedRule
                }"
                :rule="rule"
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
  import Rule from "./Rule.vue";
  import useVuelidate from "@vuelidate/core";
  import {helpers, required} from "@vuelidate/validators";


  // store
  const store = useStore();
  store.dispatch("rules/getRules");

  // references
  const indexClickedRule = ref(null);
  const searchRuleSource = ref("");

  const inputSource = ref("");
  const inputMinValue = ref(null);
  const inputMaxValue = ref(null);
  const inputIsPresent = ref(null);

  const vuelidateErrors = ref([]);

  // computed
  const rules = computed(() => {
    return store.state.rules.rules;
  });

  const ruleTypes = computed(() => {
    return store.state.rules.ruleTypes;
  });

  const filteredRules = computed(() => {
    return rules.value.filter(rule => {
      return ruleTypes.value.find(ruleType => {
        return ruleType.value === rule.source;
      }).name.toLowerCase().includes(searchRuleSource.value.toLowerCase());
    });
  });

  const selectedRule = computed(() => {
    return store.state.rules.selectedRule;
  });

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
      indexClickedRule.value = null;
    } else {
      // if no errors, get rules again
      await store.dispatch("rules/getRules");

      // clear input boxes
      clear();
    }
  }
  const createRule = async () => {
    vuelidateErrors.value = [];
    v$.value.$validate();
    console.log(v$.value);
    v$.value.$errors.forEach(error => {
      vuelidateErrors.value.push({property: error.$property, message: error.$message})
    });
    console.log(vuelidateErrors.value);

    if (!v$.value.$error) {
      const rule = {
        source: inputSource.value,
        min_value: inputMinValue.value,
        max_value: inputMaxValue.value,
        is_present: inputIsPresent.value,
      };
      const result = await store.dispatch("rules/createRule", rule);
      await CRUDResultHandler(result);
    } else {

    }
  };

  const editRule = async () => {
    vuelidateErrors.value = [];
    v$.value.$validate();
    console.log(v$.value);
    v$.value.$errors.forEach(error => {
      vuelidateErrors.value.push(error.$message)
    });
    console.log(vuelidateErrors.value);

    if (!v$.value.$error) {
      const rule = {
        source: inputSource.value,
        min_value: inputMinValue.value,
        max_value: inputMaxValue.value,
        is_present: inputIsPresent.value,
      };

      const result = await store.dispatch(
          "rules/editRule",
          {id: selectedRule.value.id, rule: rule}
      );

      await CRUDResultHandler(result);
    } else {

    }
  };

  const deleteRule = async () => {
    const result = await store.dispatch(
        "rules/deleteRule",
        selectedRule.value.id
    );

    await CRUDResultHandler(result);
  };
  const highlight = (user, index) => {
    indexClickedRule.value = index;
    store.commit("rules/setSelectedRule", user);
    vuelidateErrors.value = [];
  };

  const clear = () => {
    // clear input boxes
    inputSource.value = "";
    inputMinValue.value = null;
    inputMaxValue.value = null;
    inputIsPresent.value = null;

    searchRuleSource.value = "";

    // clear highlight
    indexClickedRule.value = null;
  }

  watch(selectedRule, newValue => {
    inputSource.value = newValue.source;
    inputMinValue.value = newValue.min_value;
    inputMaxValue.value = newValue.max_value;
    inputIsPresent.value = newValue.is_present;
  })
</script>
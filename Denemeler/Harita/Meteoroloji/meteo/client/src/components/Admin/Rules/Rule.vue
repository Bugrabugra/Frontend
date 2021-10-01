<template>
  <div class="grid grid-cols-2 cursor-pointer rounded-xl px-2 py-1">
    <div class="col-span-2 sm:col-span-1">
      <p class="font-semibold">Olay türü:
        <span class="font-normal">{{sourceName}}</span>
      </p>
      <p class="font-semibold">Mevcut/Yaklaşan:
        <span class="font-normal">{{isPresentName}}</span>
      </p>
    </div>

    <div class="col-span-2 sm:col-span-1">
      <p class="font-semibold">Minimum değer:
        <span class="font-normal">{{rule.min_value}}</span>
      </p>
      <p class="font-semibold">Maksimum değer:
        <span class="font-normal">{{rule.max_value}}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
  import {computed, defineProps} from "vue";
  import {useStore} from "vuex";

  // store
  const store = useStore();

  // props
  const props = defineProps(["rule"]);

  // computed
  const ruleTypes = computed(() => {
    return store.state.rules.ruleTypes;
  });

  const sourceName = computed(()=> {
    return ruleTypes.value.find(_rule => {
      return _rule.value === props.rule.source
    })["name"];
  });

  const isPresentName = computed(()=> {
    if (props.rule.is_present) {
      return "Mevcut";
    } else if (props.rule.is_present === null) {
      return "-";
    } else {
      return "Yaklaşan";
    }
  });
</script>
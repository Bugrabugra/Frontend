<template>
  <div class="grid grid-cols-2 cursor-pointer rounded-xl px-2 py-1">
    <div class="col-span-2 sm:col-span-1">
      <p class="font-semibold">Olay türü:
        <span class="font-normal">{{sourceName}}</span>
      </p>
      <p class="font-semibold">Olay adı:
        <span class="font-normal">{{warning.event}}</span>
      </p>
      <p class="font-semibold">Ekranda gözüksün:
        <span class="font-normal">{{isScreen}}</span>
      </p>
      <p class="font-semibold">Saha ekibine gitsin:
        <span class="font-normal">{{isField}}</span>
      </p>
    </div>

    <div class="col-span-2 sm:col-span-1">
      <p class="font-semibold">Uyarı mesajı:
        <span class="font-normal">{{warning.message}}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
  import {computed, defineProps} from "vue";
  import {useStore} from "vuex";

  // props
  const props = defineProps(["warning"]);

  // store
  const store = useStore();

  // computed
  const ruleTypes = computed(() => {
    return store.state.rules.ruleTypes;
  });

  const sourceName = computed(() => {
    return ruleTypes.value.find(_rule => {
      return _rule.value === props.warning.source
    })["name"];
  });

  const isScreen = computed(()=> {
    if (props.warning.is_screen) {
      return "Evet";
    } else if (props.warning.is_screen === null) {
      return "-";
    } else {
      return "Hayır";
    }
  });

  const isField = computed(()=> {
    if (props.warning.is_field) {
      return "Evet";
    } else if (props.warning.is_field === null) {
      return "-";
    } else {
      return "Hayır";
    }
  });
</script>
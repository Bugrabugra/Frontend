<template>
  <div class="grid grid-cols-2 cursor-pointer rounded-xl px-2 py-1">
    <div class="col-span-1">
      <p class="font-semibold">Kural türü:
        <span class="font-normal">{{sourceName}}</span>
      </p>

      <p class="font-semibold">Gruplar:</p>
      <p>{{rule.groups}}</p>
      <p class="font-semibold">Minimum değer:
        <span class="font-normal">{{rule.min_value}}</span>
      </p>
      <p class="font-semibold">Maksimum değer:
        <span class="font-normal">{{rule.max_value}}</span>
      </p>
    </div>

    <div class="col-span-1">
      <p class="font-semibold">Uyarı mesajı:
        <span class="font-normal">{{rule.warning_message}}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
  import {computed, defineProps, ref} from "vue";

  const props = defineProps(["rule"]);

  const ruleTypes = ref([
    {value: "precipitation", name: "Yağış"},
    {value: "heat", name: "Sıcaklık"},
    {value: "pressure", name: "Basınç"},
    {value: "moisture", name: "Nem"},
    {value: "snow", name: "Kar"},
    {value: "storm", name: "Fırtına"},
    {value: "lightning", name: "Yıldırım/Şimşek"},
    {value: "cloud", name: "Bulut"},
  ]);

  const sourceName = computed(()=> {
    return ruleTypes.value.find(_rule => {
      return _rule.value === props.rule.source
    })["name"];
  });
</script>
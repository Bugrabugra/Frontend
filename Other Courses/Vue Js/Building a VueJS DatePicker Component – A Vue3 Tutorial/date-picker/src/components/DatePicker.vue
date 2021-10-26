<template>
  <div class="date-picker">
    <div class="selects">
      <div class="custom-select">
        <select @change="editValue('months', $event)" ref="month">
          <option
              v-for="(month, index) in months"
              :key="month"
              :value="index"
          >
            {{month}}
          </option>
        </select>
      </div>

      <div class="custom-select">
        <select @change="editValue('date', $event)" ref="date">
          <option
              v-for="i in daysInMonth"
              :key="i"
              :value="i"
          >
            {{i}}
          </option>
        </select>
      </div>

      <div class="custom-select">
        <select @change="editValue('year', $event)" ref="year">
          <option
              v-for="i in numberOfYears"
              :key="i"
              :value="startingYear + (i - 1)"
          >
            {{startingYear + (i - 1)}}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref, onMounted, watch} from "vue";
  import moment from "moment";

  const emit = defineEmits(["update"]);

  const months = [
      'January', 'February', 'March',
      'April', 'May', 'June',
      'July', 'August', 'September',
      'October', 'November', 'December'
  ];
  const startingYear = 2021;
  const numberOfYears = 20;
  const dateValue = moment();

  const daysInMonth = ref(dateValue.daysInMonth());
  const month = ref(null);
  const date = ref(null);
  const year = ref(null);

  const editValue = (unit, evt) => {
    dateValue.set(unit, evt.target.value);
    daysInMonth.value = dateValue.daysInMonth();
    updateElements();
    emit("update", moment(dateValue).format("DD/MM/YYYY"));
  };

  const updateElements = () => {
    month.value.value = dateValue.month();
    date.value.value = dateValue.date();
    year.value.value = dateValue.format("YYYY");
  };

  onMounted(() => {
    emit("update", moment(dateValue).format("DD/MM/YYYY"));
    updateElements();
  });

</script>

<style scoped>
  .date-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .selects {
    display: flex;
  }

  .custom-select {
    background-color: #eee;
    float: left;
    margin-right: 10px;
    position: relative;
  }

  .custom-select select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: inherit;
    border: none;
    color: #333;
    display: block;
    font-size: 16px;
    height: 32px;
    padding: 5px 30px 5px 10px;
    margin: 0;
    outline: none;
  }

  .custom-select:after {
    content: "\25bc";
    color: #aaa;
    font-size: 12px;
    position: absolute;
    right: 8px;
    top: 10px;
  }
</style>
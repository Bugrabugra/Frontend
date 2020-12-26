import {onMounted, ref, watch} from "vue";


export function useNumbers() {
  // Single number, string
  const count = ref(0);
  const a = ref(0);
  const b = ref(0);
  const history = ref([]);

  const increment = (num) => {
    count.value += 1;
  }

  onMounted(() => {
    console.log("Mounted");
  })

  watch([a, b], ([newA, newB], [oldA, oldB]) => {
    if (newA !== oldA) {
      history.value.push(`a: ${oldA} -> ${newA}`)
    }
    if (newB !== oldB) {
      history.value.push(`a: ${oldB} -> ${newB}`)
    }
  })

  return {
    a, b, count, history, increment
  }
}
import {onMounted, ref} from "vue";


const useAutoCount = (startAt) => {
  const count = ref(startAt);

  onMounted(() => {
    setInterval(() => count.value += 1, 1000);
  });

  return {count};
};

export default useAutoCount;
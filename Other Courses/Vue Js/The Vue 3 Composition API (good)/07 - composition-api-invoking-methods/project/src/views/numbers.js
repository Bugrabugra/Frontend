export default function useNumbers(number) {
  const increment = () => {
    number.value++
  }

  const decrement = () => {
    number.value--
  }

  return {
    increment, decrement
  }
}
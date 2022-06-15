export const getDog = () => {
  return fetch("https://random.dog/woof.json").then((res) => res.json());
}

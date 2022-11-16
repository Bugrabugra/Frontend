const now = new Date();
const newYears = new Date("1/1/22");

console.log(now.toLocaleDateString("en-US", {
  dateStyle: "full"
}));

const dayOfWeek = (date) => {
  return date.toLocaleDateString(undefined, {weekday: "long", day: "2-digit", year: "numeric"})
};

console.log(`Today's day of the week is ${dayOfWeek(newYears)}`);

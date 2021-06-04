// Async % Await
const getTodos = async () => {
  const response = await fetch("todos/luigi.json");

  if (response.status !== 200) {
    throw new Error("cannot fetch the data");
  }
  const data = await response.json();
  return data;
};

getTodos()
  .then(data => console.log("resolved: ", data))
  .catch(error => console.log("rejected: ", error))

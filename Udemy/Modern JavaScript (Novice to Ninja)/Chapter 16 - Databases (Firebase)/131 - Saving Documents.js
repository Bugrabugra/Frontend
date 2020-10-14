const list = document.querySelector("ul");
const form = document.querySelector("form");

const addRecipe = (recipe) => {
  let time = recipe.created_at.toDate();
  let html = `
  <li>
    <div>${recipe.title}</div>
    <div>${time}</div>
  </li>
  `;
  list.innerHTML += html;
};

// Get documents
db.collection("recipes").get().then((snapshot) => {
  // When we have the data
  snapshot.docs.forEach((doc) => {
    console.log(doc.data());
    addRecipe(doc.data());
  });
}).catch((err) => {
  console.log(err);
});

// Add documents
form.addEventListener("submit", ev => {
  ev.preventDefault();

  const now = new Date();
  const recipe = {
    title: form.recipe.value,
    created_at: firebase.firestore.Timestamp.fromDate(now)
  };
  db.collection("recipes").add(recipe).then(() => {
    console.log("recipe added");
  }).catch((err) => {
    console.log(err);
  });
});
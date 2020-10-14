const list = document.querySelector("ul");
const form = document.querySelector("form");

const addRecipe = (recipe, id) => {
  let time = recipe.created_at.toDate();
  let html = `
  <li data-id="${id}">
    <div>${recipe.title}</div>
    <div>${time}</div>
    <button class="btn btn-danger btn-sm my-2">Delete</button>
  </li>
  `;
  list.innerHTML += html;
};

// Get documents
db.collection("recipes").get().then((snapshot) => {
  // When we have the data
  snapshot.docs.forEach((doc) => {
    console.log(doc.data());
    addRecipe(doc.data(), doc.id);
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

// Deleting data
list.addEventListener("click", ev => {
  // console.log(ev);
  if (ev.target.tagName === "BUTTON") {
    const id = ev.target.parentElement.getAttribute("data-id");
    db.collection("recipes").doc(id).delete().then(() => {
      console.log("recipe deleted");
    })

  }
});
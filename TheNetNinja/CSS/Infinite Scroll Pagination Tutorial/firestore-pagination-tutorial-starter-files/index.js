const container = document.querySelector(".container");
const loading = document.querySelector(".loading");

// Store last document
let latestDoc = null;

const getNextReviews = async () => {
  loading.classList.add("active");
  const ref = db.collection("reviews")
    .orderBy("createdAt")
    .startAfter(latestDoc || 0)
    .limit(6)
  const data = await ref.get();

  // Output docs
  let template = "";
  data.docs.forEach(doc => {
    const review = doc.data();
    template += `
      <div class="card">
        <h2>${review.title}</h2>
        <p>Written by ${review.author}</p>
        <p>Rating - ${review.rating} / 5</p>
      </div>
    `
  });

  container.innerHTML += template;
  loading.classList.remove("active");

  // Update latest doc
  latestDoc = data.docs[data.docs.length - 1]

  // Unattach event listeners if no more docs
  if (data.empty) {
    loadMore.removeEventListener("click", handleClick);
    container.removeEventListener("scroll", handleScroll);
  }
}

// Wait for DOM content to load
window.addEventListener('DOMContentLoaded', () => getNextReviews());

// Load more docs (button)
const loadMore = document.querySelector(".load-more button");

const handleClick = () => {
  getNextReviews();
}
loadMore.addEventListener("click", handleClick);


// Load more docs (scroll)
const handleScroll = () => {
  let triggerHeight = container.scrollTop + container.offsetHeight;
  if (triggerHeight >= container.scrollHeight) {
    getNextReviews();
  }
}

container.addEventListener("scroll", handleScroll)
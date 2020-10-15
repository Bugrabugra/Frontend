const books = document.querySelectorAll("#book-list li .name");

Array.from(books).forEach(book => {
  book.textContent += " (book title)"
})

const bookList = document.querySelector("#book-list");
// bookList.innerHTML = "<h2>Books and more books...</h2>";
bookList.innerHTML += "<h2>This is how you append</h2>";

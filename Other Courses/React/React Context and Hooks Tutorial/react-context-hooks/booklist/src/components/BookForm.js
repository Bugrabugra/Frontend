import {useContext, useRef} from "react";
import {BookContext} from "../contexts/BookContext";


const BookForm = (props) => {
  const {dispatch} = useContext(BookContext);
  const title = useRef();
  const author = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // addBook(title.current.value, author.current.value);
    dispatch({
      type: "ADD_BOOK",
      book: {
        title: title.current.value,
        author: author.current.value
      }
    });
    title.current.value = "";
    author.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" ref={title} placeholder="book"/>
      <label htmlFor="author">Author</label>
      <input type="text" id="author" ref={author} placeholder="author"/>
      <input type="submit" value="Add Book"/>
    </form>
  );
};

export default BookForm;
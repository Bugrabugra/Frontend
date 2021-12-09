import {createContext, useEffect, useReducer, useState} from "react";
import {bookReducer} from "../reducers/bookReducer";


export const BookContext = createContext();

const BookContextProvider = (props) => {
  // STATE
  // const [books, setBooks] = useState([
  //   {id: 1, title: "name of the wind", author: "patrick rothfuss"},
  //   {id: 2, title: "the final empire", author: "brandon sanderson"},
  // ]);

  // const addBook = (title, author) => {
  //   setBooks([...books, {title, author, id: uuid()}])
  // };
  //
  // const removeBook = (id) => {
  //   setBooks(books.filter(book => book.id !== id));
  // };

  // REDUCER
  const [books, dispatch] = useReducer(bookReducer, [], () => {
    const localData = localStorage.getItem("books");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books))
  }, [books]);



  return (
    <BookContext.Provider value={{books, dispatch}}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
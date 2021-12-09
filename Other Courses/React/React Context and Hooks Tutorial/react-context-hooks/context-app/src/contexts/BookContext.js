import {createContext, useState} from "react";


export const BookContext = createContext()

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([
    {id: 1, title: "name of the wind"},
    {id: 2, title: "the way of kings"},
    {id: 3, title: "the final empire"},
    {id: 4, title: "the hero of ages"},
  ]);

  return (
    <BookContext.Provider value={{books}}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
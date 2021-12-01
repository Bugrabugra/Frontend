import React, {useState} from "react";


export const ProductsContext = React.createContext({
  products: []
});

export default props => {
  const products = [
    {
    id: 'p1',
    title: 'Red Scarf',
    description: 'A pretty red scarf.',
    isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    }];

  const [productsList, setProductsList] = useState(products);

  return (
    <ProductsContext.Provider value={{products: productsList}}>
      {props.children}
    </ProductsContext.Provider>
  )
}
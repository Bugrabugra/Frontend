import { createContext, ReactElement, useEffect, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

// const initState: ProductType[] = [
//   {
//     "sku": "item0001",
//     "name": "Widget",
//     "price": 9.99
//   },
//   {
//     "sku": "item0002",
//     "name": "Premium Widget",
//     "price": 19.99
//   },
//   {
//     "sku": "item0003",
//     "name": "Deluxe Widget",
//     "price": 29.99
//   }
// ];

const initState: ProductType[] = [];

export type UseProductsContextType = { products: ProductType[] };

const initContextState: UseProductsContextType = { products: [] };
const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[] | undefined> => {
      try {
        const response = await fetch("http://localhost:3500/products");
        if (response) {
          return response.json();
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message)
        }
      }
    };

    fetchProducts().then(products => products && setProducts(products));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  )
};

export default ProductsContext;

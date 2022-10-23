const productsArray = [
  {
    id: "price_1LuuhQDcZmpDA27yFXHQBsiZ",
    title: "Coffee",
    price: 4.99
  },
  {
    id: "price_1LuuiUDcZmpDA27yFlrXLMZN",
    title: "Sunglasses",
    price: 9.99
  },
  {
    id: "price_1LuujCDcZmpDA27y7WcYd3Ee",
    title: "Camera",
    price: 39.99
  }
];

const getProductData = (id) => {
  const productData = productsArray.find((product) => product.id === id);

  if (!productData) {
    console.log("Product data does not exist for ID: " + id);
  }
  return productData;
};

export { productsArray, getProductData };

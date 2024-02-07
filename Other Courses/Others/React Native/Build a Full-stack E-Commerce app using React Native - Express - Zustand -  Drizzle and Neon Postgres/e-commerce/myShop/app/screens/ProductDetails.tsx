import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProductDetailsPageProps } from "../navigation/ProductsStack";
import { useEffect, useState } from "react";
import { fetchProductDetails, Product } from "../api/api";
import { useCartStore } from "../state/cartStore";
import { Ionicons } from "@expo/vector-icons";

const ProductDetails = ({ route }: ProductDetailsPageProps) => {
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null)
  const { products, addProduct, reduceProduct } = useCartStore((state) => state);
  const [count, setCount] = useState(0);

  useEffect(() => {
    updateProductQuantity();
  }, [products]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductDetails(id);
        setProduct(productData);
      } catch (error) {
        console.error("error: ", error);
      }
    };

    fetchProduct();
  }, []);

  const updateProductQuantity = () => {
    const result = products.filter((p) => p.id === id);
    if (result.length > 0) {
      setCount(result[0].quantity);
    } else {
      setCount(0);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <>
          <Image style={styles.productImage} source={{ uri: product.product_image }} />
          <Text style={styles.productName}>{product.product_name}</Text>
          <Text style={styles.productCategory}>{product.product_category}</Text>
          <Text style={styles.productDescription}>{product.product_description}</Text>
          <Text style={styles.productPrice}>Price: ${product.product_price}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => reduceProduct(product)}>
              <Ionicons name="remove" size={24} color={'#1fe687'} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{count}</Text>
            <TouchableOpacity style={styles.button} onPress={() => addProduct(product)}>
              <Ionicons name="add" size={24} />
            </TouchableOpacity>
          </View>
        </>

      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 18
  },
  productName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold'
  },
  productCategory: {
    marginTop: 5,
    fontSize: 16,
    color: '#666'
  },
  productDescription: {
    marginTop: 10,
    fontSize: 16
  },
  productPrice: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    borderColor: '#1fe687',
    borderWidth: 2
  },
  quantity: {
    fontSize: 20,
    width: 50,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default ProductDetails;

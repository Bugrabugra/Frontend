import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Products from "../screens/Products";
import ProductDetails from "../screens/ProductDetails";
import CartModal from "../screens/CartModal";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCartStore } from "../state/cartStore";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type ProductsStackParamList = {
  Products: undefined;
  ProductDetails: {
    id: number
  }
  CartModal: undefined
}

const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();

export type ProductsPageProps = NativeStackScreenProps<ProductsStackParamList, "Products">
export type ProductDetailsPageProps = NativeStackScreenProps<ProductsStackParamList, "ProductDetails">
export type StackNavigation = NavigationProp<ProductsStackParamList>

const ProductsStackNav = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1fe687"
        },
        headerTintColor: "#141414",
        headerRight: () => <CartButton />
      }}
    >
      <ProductsStack.Screen
        name="Products" component={Products}
        options={{
          headerTitle: "Neon Shop"
        }}
      />

      <ProductsStack.Screen
        name="ProductDetails" component={ProductDetails}
        options={{
          headerTitle: ""
        }}
      />

      <ProductsStack.Screen
        name="CartModal" component={CartModal}
        options={{
          headerShown: false,
          presentation: "modal"
        }}
      />
    </ProductsStack.Navigator>
  );
};

const CartButton = () => {
  const navigation = useNavigation<StackNavigation>();
  const { products } = useCartStore();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const count = products.reduce((prev, products) => prev + products.quantity, 0);
    setCount(count);
  }, [products]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("CartModal")}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <Ionicons name="cart" size={28} color="#000" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  countContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: -5,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  countText: {
    fontSize: 12,
    fontWeight: 'bold'
  }
});


export default ProductsStackNav;

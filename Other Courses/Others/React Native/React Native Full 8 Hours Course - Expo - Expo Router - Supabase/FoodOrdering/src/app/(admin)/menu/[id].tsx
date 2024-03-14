import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import { useProduct } from "@/api/products";
import { DEFAULT_PIZZA_IMAGE } from "@/components/ProductListItem";
import RemoteImage from "@/components/RemoteImage";
import Colors from "@/constants/Colors";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";

const SIZES: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();
  const router = useRouter();

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch product</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product?.name,
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />

      <RemoteImage
        path={product?.image}
        fallback={DEFAULT_PIZZA_IMAGE}
        style={styles.image}
      />

      <Text style={styles.title}>${product?.name}</Text>
      <Text style={styles.price}>${product?.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10
  },
  image: {
    width: "100%",
    aspectRatio: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  price: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default ProductDetailsScreen;

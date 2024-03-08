import { Link, useSegments } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Product } from "@/types";

export const DEFAULT_PIZZA_IMAGE =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link
      href={`/${segments[0] === "(admin)" ? "(admin)" : "(user)"}/menu/${product.id}`}
      asChild
    >
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || DEFAULT_PIZZA_IMAGE }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%"
  },
  image: {
    width: "100%",
    aspectRatio: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold"
  }
});

export default ProductListItem;

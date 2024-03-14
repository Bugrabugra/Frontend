import { Link, useSegments } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import RemoteImage from "@/components/RemoteImage";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Tables } from "@/types";

export const DEFAULT_PIZZA_IMAGE =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Tables<"products">;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link
      href={`/${segments[0] === "(admin)" ? "(admin)" : "(user)"}/menu/${product.id}`}
      asChild
    >
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={DEFAULT_PIZZA_IMAGE}
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

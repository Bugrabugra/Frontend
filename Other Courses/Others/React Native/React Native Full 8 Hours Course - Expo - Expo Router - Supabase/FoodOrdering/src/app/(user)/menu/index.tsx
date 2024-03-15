import { ActivityIndicator, FlatList, Text } from "react-native";

import { useProductList } from "@/api/products";
import ProductListItem from "@/components/ProductListItem";

export default function MenuScreen() {
  const { error, data: products, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}

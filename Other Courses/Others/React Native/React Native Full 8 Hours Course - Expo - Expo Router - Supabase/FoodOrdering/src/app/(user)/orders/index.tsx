import { ActivityIndicator, FlatList, Text } from "react-native";

import { useMyOrdersList } from "@/api/orders";
import OrderItemListItem from "@/components/OrderListItem";

const OrdersScreen = () => {
  const { data: orders, isLoading, error } = useMyOrdersList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch my orders</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItemListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
};

export default OrdersScreen;

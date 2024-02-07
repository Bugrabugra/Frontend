import {
  FlatList,
  Image, Keyboard,
  KeyboardAvoidingView, Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useCartStore } from "../state/cartStore";
import { useState } from "react";
import { createOrder, Order } from "../api/api";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../navigation/ProductsStack";
import { Ionicons } from "@expo/vector-icons";
import ConfettiCannon from 'react-native-confetti-cannon';

const CartModal = () => {
  const {
    products,
    total,
    reduceProduct,
    addProduct,
    clearCart
  } = useCartStore();
  const [email, setEmail] = useState("test@gmail.com");
  const [order, setOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation<StackNavigation>();

  const onSubmitOrder = async () => {
    setIsSubmitting(true);
    Keyboard.dismiss();

    try {
      const response = await createOrder({
        email, products: products.map((p) => {
          return {
            product_id: p.id, quantity: p.quantity
          }
        })
      });

      setOrder(response);
      clearCart();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>

      {order ? (
        <>
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            fallSpeed={2500}
            fadeOut={false}
            autoStart={true}
          />
          <View
            style={{
              marginTop: '50%',
              padding: 20,
              backgroundColor: '#000',
              borderRadius: 8,
              marginBottom: 20,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 26 }}>Order
              submitted!</Text>
            <Text style={{ color: '#fff', fontSize: 16, margin: 20 }}>Order ID: {order.id}</Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ backgroundColor: '#1fe687', padding: 10, borderRadius: 8 }}
            >
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>Continue
                Shopping</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.cartTitle}>Your Cart</Text>
          {products.length === 0 && <Text style={{ textAlign: "center" }}>Your cart is empty</Text>}
        </>

      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={75}
        >
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <View style={styles.cartItemContainer}>
                <Image source={{ uri: item.product_image }} style={styles.cartItemImage} />
                <View style={styles.itemContainer}>
                  <Text style={styles.cartItemName}>{item.product_name}</Text>
                  <Text>Price: ${item.product_price}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => reduceProduct(item)} style={{ padding: 10 }}>
                    <Ionicons name="remove" size={20} color={'#000'} />
                  </TouchableOpacity>

                  <Text style={styles.cartItemQuantity}>{item.quantity}</Text>

                  <TouchableOpacity onPress={() => addProduct(item)} style={{ padding: 10 }}>
                    <Ionicons name="add" size={20} color={'#000'} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />

          <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>

          <TextInput
            style={styles.emailInput}
            placeholder="Enter your email"
            onChangeText={setEmail}
          />
          <TouchableOpacity
            style={[styles.submitButton, email === '' ? styles.inactive : null]}
            onPress={onSubmitOrder}
            disabled={email === '' || isSubmitting}
          >
            <Text style={styles.submitButtonText}>{isSubmitting ? 'Creating Order...' : 'Submit Order'}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1fe687'
  },
  cartItemContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  cartItemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 10
  },
  itemContainer: {
    flex: 1
  },
  cartItemQuantity: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#1fe687',
    padding: 5,
    width: 30,
    color: '#fff',
    textAlign: 'center'
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f2f2f2'
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center'
  },
  inactive: {
    opacity: 0.5
  },
  submitButtonText: {
    color: '#1fe687',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default CartModal;

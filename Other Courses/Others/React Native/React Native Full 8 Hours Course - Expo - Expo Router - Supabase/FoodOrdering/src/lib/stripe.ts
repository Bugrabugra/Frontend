import {
  initPaymentSheet,
  presentPaymentSheet
} from "@stripe/stripe-react-native";
import { Alert } from "react-native";

import { supabase } from "@/lib/supabase";

const fetchPaymentSheetParams = async (amount: number) => {
  const { data } = await supabase.functions.invoke("payment-sheet", {
    body: { amount }
  });

  if (data) {
    return data;
  }

  Alert.alert("Error fetching payment sheet params");
  return {};
};

export const initialisePaymentSheet = async (amount: number) => {
  const { paymentIntent, publishableKey, customer, ephemeralKey } =
    await fetchPaymentSheetParams(amount);

  if (!paymentIntent || !publishableKey) {
    return;
  }

  await initPaymentSheet({
    merchantDisplayName: "Bugra",
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    defaultBillingDetails: {
      name: "Jane"
    }
  });
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(error.message);
    return false;
  }
  return true;
};

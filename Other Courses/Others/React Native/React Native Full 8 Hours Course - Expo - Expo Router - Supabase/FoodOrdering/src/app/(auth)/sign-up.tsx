import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signUpWithEmail = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      Alert.alert(error.message);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
        inputMode="email"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button
        onPress={signUpWithEmail}
        disabled={isLoading}
        text={isLoading ? "Creating account..." : "Create account"}
      />

      <Link href="/sign-in" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1
  },
  label: {
    color: "gray"
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10
  }
});

export default SignUpScreen;

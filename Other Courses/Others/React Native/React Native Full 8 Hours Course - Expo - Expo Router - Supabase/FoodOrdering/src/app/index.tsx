import { Link, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import "react-native-url-polyfill";

const Index = () => {
  const { session, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  if (!isAdmin) {
    return <Redirect href="/(user)" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href="/(user)" asChild>
        <Button text="User" />
      </Link>

      <Link href="/(admin)" asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default Index;

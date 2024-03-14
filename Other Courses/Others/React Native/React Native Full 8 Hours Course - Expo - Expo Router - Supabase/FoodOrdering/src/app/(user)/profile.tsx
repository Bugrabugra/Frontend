import { Button, View } from "react-native";

import { supabase } from "@/lib/supabase";

const ProfileScreen = () => {
  return (
    <View>
      <Button
        title="Sign out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default ProfileScreen;

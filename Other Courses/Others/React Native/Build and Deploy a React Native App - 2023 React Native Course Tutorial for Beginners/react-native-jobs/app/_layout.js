import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import { Asset as Font } from "expo-asset";


SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    "DMSans-Bold": require("../assets/fonts/DMSans-Bold.ttf"),
    "DMSans-Medium": require("../assets/fonts/DMSans-Medium.ttf"),
    "DMSans-Regular": require("../assets/fonts/DMSans-Regular.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack onLayout={onLayoutRootView} />;
};

export default Layout;

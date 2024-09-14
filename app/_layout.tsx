import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { RootSiblingParent } from "react-native-root-siblings";

import { useColorScheme } from "@/hooks/useColorScheme";
import { LogBox } from "react-native";
import Welcom from "@/components/Welcom";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  LogBox.ignoreAllLogs();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="home/Search" options={{ headerShown: false }} />
          <Stack.Screen name="home/ScanCode" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="material" options={{ headerShown: false }} />
          <Stack.Screen name="terms" options={{ headerShown: false }} />
          <Stack.Screen name="privacy" options={{ headerShown: false }} />
          <Stack.Screen name="personal/AccountSetting" options={{ headerShown: false }} />
          <Stack.Screen name="personal/EditName" options={{ headerShown: false }} />
          <Stack.Screen name="personal/ExportKey" options={{ headerShown: false }} />
          <Stack.Screen name="personal/About" options={{ headerShown: false }} />
          <Stack.Screen name="personal/ChangePassword" options={{ headerShown: false }} />
          <Stack.Screen name="land/AddLand" options={{ headerShown: false }} />
          <Stack.Screen name="land/landEditDetail" options={{ headerShown: false }} />
          <Stack.Screen name="land/DiagnosisDetail" options={{ headerShown: false }} />
          <Stack.Screen name="land/LandDetail" options={{ headerShown: false }} />
          <Stack.Screen name="cropper/addCrop" options={{ headerShown: false }} />
          <Stack.Screen name="cropper/cropEdit" options={{ headerShown: false }} />
          <Stack.Screen name="cropper/cropSetting" options={{ headerShown: false }} />
          <Stack.Screen name="cropper/diagnosis" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </RootSiblingParent>
  );
}

import '../global.css';

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import {
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
  useFonts,
} from "@expo-google-fonts/lexend";
import { ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { ToastProvider } from "@/components/ui/toast";
import { storage } from "@/lib/storage";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ConvexAuthProvider client={convex} storage={storage}>
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="design-system"
            options={{
              headerShown: true,
              title: "Design System",
              headerBackTitle: "Back",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ToastProvider>
    </ConvexAuthProvider>
  );
}

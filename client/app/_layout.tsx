import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="job/[id]" options={{ presentation: "card", animation: "slide_from_right" }} />
          <Stack.Screen name="employer" options={{ presentation: "card", animation: "slide_from_right" }} />
          <Stack.Screen name="learning/[id]" options={{ presentation: "card", animation: "slide_from_right" }} />
          <Stack.Screen name="verification" options={{ presentation: "card", animation: "slide_from_right" }} />
          <Stack.Screen name="settings" options={{ presentation: "card", animation: "slide_from_right" }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

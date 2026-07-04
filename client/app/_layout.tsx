import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="job/[id]" options={{ presentation: "card", animation: "slide_from_right" }} />
      <Stack.Screen name="chat" />
      <Stack.Screen name="employer" options={{ presentation: "card", animation: "slide_from_right" }} />
      <Stack.Screen name="learning" options={{ presentation: "card", animation: "slide_from_right" }} />
      <Stack.Screen name="verification" options={{ presentation: "card", animation: "slide_from_right" }} />
      <Stack.Screen name="settings" options={{ presentation: "card", animation: "slide_from_right" }} />
    </Stack>
  );
}
